package com.besafx.app.rest;

import com.besafx.app.entity.Deposit;
import com.besafx.app.entity.Person;
import com.besafx.app.search.DepositSearch;
import com.besafx.app.service.BankService;
import com.besafx.app.service.DepositService;
import com.besafx.app.service.PersonService;
import com.besafx.app.util.ArabicLiteralNumberParser;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;

@RestController
@RequestMapping(value = "/api/deposit/")
public class DepositRest {

    private final static Logger log = LoggerFactory.getLogger(DepositRest.class);

    private final String FILTER_TABLE = "**,bank[id],lastPerson[id,contact[id,firstName,forthName]]";

    @Autowired
    private PersonService personService;

    @Autowired
    private BankService bankService;

    @Autowired
    private DepositService depositService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private DepositSearch depositSearch;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_DEPOSIT_CREATE')")
    public synchronized String create(@RequestBody Deposit deposit, Principal principal) {
        Person person = personService.findByEmail(principal.getName());
        deposit.setLastUpdate(new Date());
        deposit.setLastPerson(person);
        deposit.getBank().setStock(deposit.getBank().getStock() + deposit.getAmount());
        deposit.setBank(bankService.save(deposit.getBank()));
        deposit = depositService.save(deposit);
        notificationService.notifyAll(Notification.builder().message("تم إيداع مبلغ بمقدار " + ArabicLiteralNumberParser.literalValueOf(deposit.getAmount()) + " ريال سعودي إلي الحساب رقم " + deposit.getCode() + " بنجاح.").type("success").build());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), deposit);
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), Lists.newArrayList(depositService.findAll()));
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), depositService.findOne(id));
    }

    @RequestMapping(value = "filter", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String filter(
            @RequestParam(value = "code", required = false) final Long code,
            @RequestParam(value = "amountFrom", required = false) final Long amountFrom,
            @RequestParam(value = "amountTo", required = false) final Long amountTo,
            @RequestParam(value = "fromName", required = false) final String fromName,
            @RequestParam(value = "dateFrom,", required = false) final Long dateFrom,
            @RequestParam(value = "dateTo,", required = false) final Long dateTo,
            @RequestParam(value = "bankCode", required = false) final Long bankCode,
            @RequestParam(value = "bankName", required = false) final String bankName,
            @RequestParam(value = "bankBranchName", required = false) final String bankBranchName,
            @RequestParam(value = "bankStockFrom", required = false) final Long bankStockFrom,
            @RequestParam(value = "bankStockTo", required = false) final Long bankStockTo,
            @RequestParam(value = "branchId", required = false) final Long branchId) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE),
                depositSearch.search(code, amountFrom, amountTo, fromName, dateFrom, dateTo, bankCode, bankName, bankBranchName, bankStockFrom, bankStockTo, branchId));
    }

}
