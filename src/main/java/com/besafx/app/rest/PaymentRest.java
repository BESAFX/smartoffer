package com.besafx.app.rest;

import com.besafx.app.entity.Account;
import com.besafx.app.entity.Payment;
import com.besafx.app.entity.Person;
import com.besafx.app.search.PaymentSearch;
import com.besafx.app.service.AccountService;
import com.besafx.app.service.PaymentService;
import com.besafx.app.service.PersonService;
import com.besafx.app.util.ArabicLiteralNumberParser;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import com.google.common.collect.Lists;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/payment")
public class PaymentRest {

    private final static Logger log = LoggerFactory.getLogger(AccountRest.class);

    public static final String FILTER_TABLE = "" +
            "**," +
            "lastPerson[id,contact[id,shortName]]," +
            "account[id,key,name,course[id,code,master[id,code,name,masterCategory[id,name]]]]";

    @Autowired
    private PersonService personService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private PaymentSearch paymentSearch;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PAYMENT_CREATE')")
    public String create(@RequestBody Payment payment, Principal principal) {
        payment.setAccount(accountService.findOne(payment.getAccount().getId()));
        Person person = personService.findByEmail(principal.getName());
        payment.setDate(new DateTime().toDate());
        payment.setLastPerson(person);
        payment.setLastUpdate(new DateTime().toDate());
        payment.setAmountString(ArabicLiteralNumberParser.literalValueOf(payment.getAmountNumber()));
        payment = paymentService.save(payment);
        notificationService.notifyAll(Notification.builder().message("تم سند قبض رقم " + payment.getCode()).type("success").build());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), payment);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PAYMENT_UPDATE')")
    public String update(@RequestBody Payment payment, Principal principal) {
        Payment object = paymentService.findOne(payment.getId());
        if (object != null) {
//            if (paymentService.findByCodeAndAccountCourseMasterBranchAndIdNot(
//                    payment.getCode(),
//                    payment.getAccount().getCourse().getMaster().getBranch(),
//                    payment.getId()) != null) {
//                throw new CustomException("لا يمكن تكرار رقم السند داخل الفرع، حيث لكل فرع دفتر سندات قبض خاص به");
//            }
            Person person = personService.findByEmail(principal.getName());
            payment.setLastUpdate(new Date());
            payment.setLastPerson(person);
            payment.setAmountString(ArabicLiteralNumberParser.literalValueOf(payment.getAmountNumber()));
            payment = paymentService.save(payment);
            notificationService.notifyAll(Notification.builder().message("تم تعديل بيانات السند بنجاح").type("success").build());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), payment);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PAYMENT_DELETE')")
    public void delete(@PathVariable Long id, Principal principal) {
        Payment object = paymentService.findOne(id);
        if (object != null) {
            paymentService.delete(id);
            notificationService.notifyAll(Notification.builder().message("تم حذف سند القبض رقم " + object.getCode() + " بنجاح").type("success").build());
        }
    }

    @RequestMapping(value = "deleteByCourse/{courseId}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_PAYMENT_DELETE')")
    public void deleteByCourse(@PathVariable Long courseId, Principal principal) {
        List<Account> accounts = accountService.findByCourseId(courseId);
        if (!accounts.isEmpty()) {
            List<Payment> payments = paymentService.findByAccountIn(accounts);
            paymentService.delete(payments);
            notificationService.notifyAll(Notification.builder().message("تم حذف سندات كل طلاب الدورة بنجاح").type("success").build());
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), Lists.newArrayList(paymentService.findAll()));
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), paymentService.findOne(id));
    }

    @RequestMapping(value = "findByAccount/{accountId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findByAccount(@PathVariable Long accountId) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), paymentService.findByAccountId(accountId));
    }

    @RequestMapping(value = "filter", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String filter(
            @RequestParam(value = "paymentCodeFrom", required = false) final String paymentCodeFrom,
            @RequestParam(value = "paymentCodeTo", required = false) final String paymentCodeTo,
            @RequestParam(value = "paymentDateFrom", required = false) final Long paymentDateFrom,
            @RequestParam(value = "paymentDateTo", required = false) final Long paymentDateTo,
            @RequestParam(value = "amountFrom", required = false) final Long amountFrom,
            @RequestParam(value = "amountTo", required = false) final Long amountTo,
            @RequestParam(value = "firstName", required = false) final String firstName,
            @RequestParam(value = "secondName", required = false) final String secondName,
            @RequestParam(value = "thirdName", required = false) final String thirdName,
            @RequestParam(value = "forthName", required = false) final String forthName,
            @RequestParam(value = "dateFrom", required = false) final Long dateFrom,
            @RequestParam(value = "dateTo", required = false) final Long dateTo,
            @RequestParam(value = "studentIdentityNumber", required = false) final String studentIdentityNumber,
            @RequestParam(value = "studentMobile", required = false) final String studentMobile,
            @RequestParam(value = "coursePriceFrom", required = false) final Long coursePriceFrom,
            @RequestParam(value = "coursePriceTo", required = false) final Long coursePriceTo,
            @RequestParam(value = "course", required = false) final Long course,
            @RequestParam(value = "master", required = false) final Long master,
            @RequestParam(value = "branch", required = false) final Long branch,
            @RequestParam(value = "personBranch", required = false) final Long personBranch,
            @RequestParam(value = "type", required = false) final String type,
            Pageable pageable) {
        return SquigglyUtils.stringify(
                Squiggly.init(new ObjectMapper(), "**,".concat("content[").concat(FILTER_TABLE).concat("]")),
                paymentSearch.search(
                        paymentCodeFrom,
                        paymentCodeTo,
                        paymentDateFrom,
                        paymentDateTo,
                        amountFrom,
                        amountTo,
                        firstName,
                        secondName,
                        thirdName,
                        forthName,
                        dateFrom,
                        dateTo,
                        studentIdentityNumber,
                        studentMobile,
                        coursePriceFrom,
                        coursePriceTo,
                        course,
                        master,
                        branch,
                        personBranch,
                        type,
                        pageable
                ));
    }
}
