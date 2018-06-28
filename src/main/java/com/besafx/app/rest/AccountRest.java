package com.besafx.app.rest;

import com.besafx.app.config.SendSMS;
import com.besafx.app.entity.*;
import com.besafx.app.search.AccountSearch;
import com.besafx.app.service.*;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/account/")
public class AccountRest {

    public static final String FILTER_TABLE = "" +
            "**," +
            "lastPerson[id,contact[id,shortName]]," +
            "course[id,code,master[id,code,name,branch[id,code,name]]]," +
            "student[id,contact[**]]," +
            "payments[**,lastPerson[id,contact[id,shortName]],-account]," +
            "accountAttaches[**,attach[**,person[id,contact[id,shortName]]],-account]," +
            "accountConditions[**,-account,person[id,contact[id,shortName]]]," +
            "accountNotes[**,-account,person[id,contact[id,shortName]]]";

    public static final String FILTER_ACCOUNT_COMBO = "" +
            "id," +
            "code," +
            "key," +
            "name," +
            "registerDate," +
            "requiredPrice," +
            "paidPrice," +
            "remainPrice," +
            "course[id,code,master[id,code,name,branch[id,code,name]]]," +
            "student[id,contact[id,firstName,secondName,thirdName,forthName,mobile,identityNumber]]";

    public static final String FILTER_ACCOUNT_ATTACH = "" +
            "id," +
            "key," +
            "name," +
            "course[id,master[id,name]]," +
            "student[id,contact[id,mobile,identityNumber]]," +
            "accountAttaches[**,attach[**,person[id,contact[id,shortName]]],-account]";

    public static final String FILTER_ACCOUNT_INFO = "" +
            "id," +
            "code," +
            "registerDate," +
            "requiredPrice," +
            "paidPrice," +
            "remainPrice," +
            "course[id,code,master[id,code,name,branch[id,code,name]]]," +
            "student[id,contact[id,firstName,secondName,thirdName,forthName,mobile,identityNumber]]";

    public static final String FILTER_ACCOUNT_KEY = "" +
            "id," +
            "key," +
            "name," +
            "remainPrice";

    private final static Logger log = LoggerFactory.getLogger(AccountRest.class);

    @Autowired
    private PersonService personService;

    @Autowired
    private BranchService branchService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private ContactService contactService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private MasterService masterService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private AccountAttachService accountAttachService;

    @Autowired
    private AccountConditionService accountConditionService;

    @Autowired
    private AccountNoteService accountNoteService;

    @Autowired
    private AccountSearch accountSearch;

    @Autowired
    private SendSMS sendSMS;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ACCOUNT_CREATE')")
    public String create(@RequestBody Account account, Principal principal) {
        Person person = personService.findByEmail(principal.getName());
        Account topAccount = accountService.findTopByCourseOrderByCodeDesc(account.getCourse());
        if (topAccount == null) {
            account.setCode(1);
        } else {
            account.setCode(topAccount.getCode() + 1);
        }
        account.setRegisterDate(new Date());
        account.setLastUpdate(new Date());
        account.setLastPerson(person);
        account.getStudent().setContact(contactService.save(account.getStudent().getContact()));
        account.setStudent(studentService.save(account.getStudent()));
        account = accountService.save(account);
        notificationService.notifyAll(Notification.builder().message("تم اضافة تسجيل جديد بنجاح").type("success").build());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), account);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ACCOUNT_UPDATE')")
    public String update(@RequestBody Account account, Principal principal) {
        Account object = accountService.findOne(account.getId());
        if (object != null) {
            Person person = personService.findByEmail(principal.getName());
            account.setRegisterDate(new Date());
            account.setLastUpdate(new Date());
            account.setLastPerson(person);
            account.getStudent().setContact(contactService.save(account.getStudent().getContact()));
            account.setStudent(studentService.save(account.getStudent()));
            account = accountService.save(account);
            notificationService.notifyAll(Notification.builder().message("تم تعديل بيانات التسجيل بنجاح").type("success").build());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), account);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ACCOUNT_DELETE')")
    public void delete(@PathVariable Long id, Principal principal) {
        Account account = accountService.findOne(id);
        if (account != null) {
            accountAttachService.delete(account.getAccountAttaches());
            accountConditionService.delete(account.getAccountConditions());
            accountNoteService.delete(account.getAccountNotes());
            paymentService.delete(account.getPayments());
            accountService.delete(id);
            notificationService.notifyAll(Notification.builder().message("تم حذف الاشتراك وكل ما يتعلق به من سندات وحسابات بنجاح").type("success").build());
        }
    }

    @RequestMapping(value = "deleteByCourse/{courseId}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ACCOUNT_DELETE')")
    public void deleteByCourse(@PathVariable Long courseId, Principal principal) {
        List<Account> accounts = accountService.findByCourseId(courseId);
        if (!accounts.isEmpty()) {
            List<Payment> payments = paymentService.findByAccountIn(accounts);
            paymentService.delete(payments);

            List<AccountAttach> accountAttaches = accountAttachService.findByAccountIn(accounts);
            accountAttachService.delete(accountAttaches);

            List<AccountCondition> accountConditions = accountConditionService.findByAccountIn(accounts);
            accountConditionService.delete(accountConditions);

            accountService.delete(accounts);
            notificationService.notifyAll(Notification.builder().message("تم حذف الطلاب وكل ما يتعلق بهم من سندات وحسابات بنجاح").type("success").build());
        }
    }

    @RequestMapping(value = "sendMessage/{content}/{mobiles}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_SEND_SMS')")
    public void sendMessage(@PathVariable String content, @PathVariable List<String> mobiles) {
        sendSMS.sendMessage(mobiles, content);
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), Lists.newArrayList(accountService.findAll()));
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), accountService.findOne(id));
    }

    @RequestMapping(value = "count", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Long count() {
        return accountService.count();
    }

    @RequestMapping(value = "findByMobile/{mobile}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findByMobile(@PathVariable String mobile) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), accountService.findByStudentContactMobileContaining(mobile));
    }

    @RequestMapping(value = "findByStudent/{studentId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findByStudent(@PathVariable Long studentId) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), accountService.findByStudent(studentService.findOne(studentId)));
    }

    @RequestMapping(value = "findByCourse/{courseId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findByCourse(@PathVariable Long courseId) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), accountService.findByCourse(courseService.findOne(courseId)));
    }

    @RequestMapping(value = "findByMaster/{masterId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findByMaster(@PathVariable Long masterId) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), accountService.findByCourseMaster(masterService.findOne(masterId)));
    }

    @RequestMapping(value = "findByBranch/{branchId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findByBranch(@PathVariable Long branchId) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_ACCOUNT_COMBO),
                accountService.findByCourseMasterBranch(branchService.findOne(branchId)));
    }

    @RequestMapping(value = "findByBranchWithKey/{branchId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findByBranchWithKey(@PathVariable Long branchId) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_ACCOUNT_KEY),
                accountService.findByCourseMasterBranchId(branchId, new PageRequest(0, 10)));
    }

    @RequestMapping(value = "findByBranches", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findByBranches(@RequestParam List<Long> branchIds) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_ACCOUNT_COMBO),
                accountService.findByCourseMasterBranchIdIn(branchIds));
    }

    @RequestMapping(value = "fetchTableData", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String fetchTableData(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE),
                personService.findByEmail(principal.getName())
                        .getBranch().getMasters().stream()
                        .flatMap(master -> master.getCourses().stream())
                        .collect(Collectors.toList())
                        .stream()
                        .flatMap(course -> course.getAccounts().stream())
                        .collect(Collectors.toList()));
    }

    @RequestMapping(value = "fetchTableDataAccountComboBox", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String fetchTableDataAccountComboBox(Principal principal) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_ACCOUNT_COMBO),
                personService.findByEmail(principal.getName())
                        .getBranches().stream()
                        .flatMap(branch -> branch.getMasters().stream())
                        .collect(Collectors.toList())
                        .stream()
                        .flatMap(master -> master.getCourses().stream())
                        .collect(Collectors.toList())
                        .stream()
                        .flatMap(course -> course.getAccounts().stream())
                        .collect(Collectors.toList()));
    }

    @RequestMapping(value = "filter", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String filter(
            @RequestParam(value = "firstName", required = false) final String firstName,
            @RequestParam(value = "secondName", required = false) final String secondName,
            @RequestParam(value = "thirdName", required = false) final String thirdName,
            @RequestParam(value = "forthName", required = false) final String forthName,
            @RequestParam(value = "fullName", required = false) final String fullName,
            @RequestParam(value = "dateFrom", required = false) final Long dateFrom,
            @RequestParam(value = "dateTo", required = false) final Long dateTo,
            @RequestParam(value = "studentIdentityNumber", required = false) final String studentIdentityNumber,
            @RequestParam(value = "studentMobile", required = false) final String studentMobile,
            @RequestParam(value = "coursePriceFrom", required = false) final Long coursePriceFrom,
            @RequestParam(value = "coursePriceTo", required = false) final Long coursePriceTo,
            @RequestParam(value = "courseIds", required = false) final List<Long> courseIds,
            @RequestParam(value = "masterIds", required = false) final List<Long> masterIds,
            @RequestParam(value = "branchIds", required = false) final List<Long> branchIds,
            @RequestParam(value = "courseCodes", required = false) final List<Integer> courseCodes,
            @RequestParam(value = "masterCodes", required = false) final List<Integer> masterCodes,
            @RequestParam(value = "branchCodes", required = false) final List<Integer> branchCodes,
            @RequestParam(value = "searchType") final String searchType,
            Pageable pageable) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(),
                "**,".concat("content[").concat(FILTER_TABLE).concat("]")),
                accountSearch.search(
                        firstName,
                        secondName,
                        thirdName,
                        forthName,
                        fullName,
                        dateFrom,
                        dateTo,
                        studentIdentityNumber,
                        studentMobile,
                        coursePriceFrom,
                        coursePriceTo,
                        courseIds,
                        masterIds,
                        branchIds,
                        courseCodes,
                        masterCodes,
                        branchCodes,
                        searchType,
                        pageable));
    }

    @RequestMapping(value = "filterWithInfo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String filterWithInfo(
            @RequestParam(value = "firstName", required = false) final String firstName,
            @RequestParam(value = "secondName", required = false) final String secondName,
            @RequestParam(value = "thirdName", required = false) final String thirdName,
            @RequestParam(value = "forthName", required = false) final String forthName,
            @RequestParam(value = "fullName", required = false) final String fullName,
            @RequestParam(value = "dateFrom", required = false) final Long dateFrom,
            @RequestParam(value = "dateTo", required = false) final Long dateTo,
            @RequestParam(value = "studentIdentityNumber", required = false) final String studentIdentityNumber,
            @RequestParam(value = "studentMobile", required = false) final String studentMobile,
            @RequestParam(value = "coursePriceFrom", required = false) final Long coursePriceFrom,
            @RequestParam(value = "coursePriceTo", required = false) final Long coursePriceTo,
            @RequestParam(value = "courseIds", required = false) final List<Long> courseIds,
            @RequestParam(value = "masterIds", required = false) final List<Long> masterIds,
            @RequestParam(value = "branchIds", required = false) final List<Long> branchIds,
            @RequestParam(value = "courseCodes", required = false) final List<Integer> courseCodes,
            @RequestParam(value = "masterCodes", required = false) final List<Integer> masterCodes,
            @RequestParam(value = "branchCodes", required = false) final List<Integer> branchCodes,
            @RequestParam(value = "searchType") final String searchType,
            Pageable pageable) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), "**,".concat("content[").concat(FILTER_ACCOUNT_COMBO).concat("]")),
                accountSearch.search(
                        firstName,
                        secondName,
                        thirdName,
                        forthName,
                        fullName,
                        dateFrom,
                        dateTo,
                        studentIdentityNumber,
                        studentMobile,
                        coursePriceFrom,
                        coursePriceTo,
                        courseIds,
                        masterIds,
                        branchIds,
                        courseCodes,
                        masterCodes,
                        branchCodes,
                        searchType,
                        pageable));
    }

    @RequestMapping(value = "filterWithAttaches", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String filterWithAttaches(
            @RequestParam(value = "firstName", required = false) final String firstName,
            @RequestParam(value = "secondName", required = false) final String secondName,
            @RequestParam(value = "thirdName", required = false) final String thirdName,
            @RequestParam(value = "forthName", required = false) final String forthName,
            @RequestParam(value = "fullName", required = false) final String fullName,
            @RequestParam(value = "dateFrom", required = false) final Long dateFrom,
            @RequestParam(value = "dateTo", required = false) final Long dateTo,
            @RequestParam(value = "studentIdentityNumber", required = false) final String studentIdentityNumber,
            @RequestParam(value = "studentMobile", required = false) final String studentMobile,
            @RequestParam(value = "coursePriceFrom", required = false) final Long coursePriceFrom,
            @RequestParam(value = "coursePriceTo", required = false) final Long coursePriceTo,
            @RequestParam(value = "courseIds", required = false) final List<Long> courseIds,
            @RequestParam(value = "masterIds", required = false) final List<Long> masterIds,
            @RequestParam(value = "branchIds", required = false) final List<Long> branchIds,
            @RequestParam(value = "courseCodes", required = false) final List<Integer> courseCodes,
            @RequestParam(value = "masterCodes", required = false) final List<Integer> masterCodes,
            @RequestParam(value = "branchCodes", required = false) final List<Integer> branchCodes,
            @RequestParam(value = "searchType") final String searchType,
            Pageable pageable) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), "**,".concat("content[").concat(FILTER_ACCOUNT_ATTACH).concat("]")),
                accountSearch.search(
                        firstName,
                        secondName,
                        thirdName,
                        forthName,
                        fullName,
                        dateFrom,
                        dateTo,
                        studentIdentityNumber,
                        studentMobile,
                        coursePriceFrom,
                        coursePriceTo,
                        courseIds,
                        masterIds,
                        branchIds,
                        courseCodes,
                        masterCodes,
                        branchCodes,
                        searchType,
                        pageable));
    }


}
