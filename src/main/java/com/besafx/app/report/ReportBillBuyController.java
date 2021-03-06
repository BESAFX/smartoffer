package com.besafx.app.report;

import com.besafx.app.component.ReportExporter;
import com.besafx.app.entity.BillBuy;
import com.besafx.app.entity.Offer;
import com.besafx.app.entity.Person;
import com.besafx.app.enums.ExportType;
import com.besafx.app.service.BillBuyService;
import com.besafx.app.service.PersonService;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.net.URL;
import java.security.Principal;
import java.util.*;

@RestController
public class ReportBillBuyController {

    @Autowired
    private BillBuyService billBuyService;

    @Autowired
    private ReportExporter reportExporter;

    @RequestMapping(value = "/report/BillBuyByBranches", method = RequestMethod.GET, produces = MediaType.ALL_VALUE)
    @ResponseBody
    public void printBillBuyByBranch(
            @RequestParam(value = "branchIds") List<Long> branchIds,
            @RequestParam(value = "exportType") ExportType exportType,
            @RequestParam(value = "billBuyTypeIds", required = false) List<Long> billBuyTypeIds,
            @RequestParam(value = "startDate", required = false) Long startDate,
            @RequestParam(value = "endDate", required = false) Long endDate,
            @RequestParam(value = "title") String title,
            Sort sort,
            HttpServletResponse response) throws Exception {
        Map<String, Object> map = new HashMap<>();
        map.put("title", title);
        //Start Search
        List<Specification> predicates = new ArrayList<>();
        Optional.ofNullable(branchIds).ifPresent(value -> predicates.add((root, cq, cb) -> root.get("branch").get("id").in(value)));
        Optional.ofNullable(billBuyTypeIds).ifPresent(value -> predicates.add((root, cq, cb) -> root.get("billBuyType").get("id").in(value)));
        Optional.ofNullable(startDate).ifPresent(value -> predicates.add((root, cq, cb) -> cb.greaterThanOrEqualTo(root.get("date"), new DateTime(value).withTimeAtStartOfDay().toDate())));
        Optional.ofNullable(endDate).ifPresent(value -> predicates.add((root, cq, cb) -> cb.lessThanOrEqualTo(root.get("date"), new DateTime(value).plusDays(1).withTimeAtStartOfDay().toDate())));
        map.put("billBuys", getList(predicates, sort));
        //End Search
        ClassPathResource jrxmlFile = new ClassPathResource("/report/billBuy/Report.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(jrxmlFile.getInputStream());
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, map);
        reportExporter.export(exportType, response, jasperPrint);
    }

    private List<BillBuy> getList(List<Specification> predicates, Sort sort) {
        if (!predicates.isEmpty()) {
            Specification result = predicates.get(0);
            for (int i = 1; i < predicates.size(); i++) {
                result = Specifications.where(result).and(predicates.get(i));
            }
            return billBuyService.findAll(result, sort);
        }else{
            return new ArrayList<>();
        }
    }
}
