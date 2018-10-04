package com.besafx.app.async;

import com.besafx.app.entity.*;
import com.besafx.app.service.*;
import com.google.common.collect.Lists;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
public class TransactionalService {

    @Autowired
    private OfferService offerService;

    @Autowired
    private BranchService branchService;

    @Autowired
    private MasterService masterService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private BillBuyService billBuyService;

    @Transactional
    public List<Offer> getOffersByDateAndBranch(Branch branch, Date dateFrom, Date dateTo) {
        return offerService.findByMasterBranchAndLastUpdateBetween(branch, dateFrom, dateTo);
    }

    @Transactional
    public List<Payment> getPaymentsByDateAndBranch(Branch branch, Date dateFrom, Date dateTo) {
        return paymentService.findByAccountCourseMasterBranchAndDateBetween(branch, dateFrom, dateTo);
    }

    @Transactional
    public List<BillBuy> getBillBuysByDateAndBranch(Branch branch, Date dateFrom, Date dateTo) {
        return billBuyService.findByBranchAndDateBetween(branch, dateFrom, dateTo);
    }

    @Transactional
    public List<Branch> getBranches(){
        return Lists.newArrayList(branchService.findAll());
    }

    @Transactional
    public List<Master> getMastersByBranch(Branch branch){
        return masterService.findByBranch(branch);
    }

    @Transactional
    public List<Account> getAccountsByMobile(String mobile){
        return accountService.findByStudentContactMobileContaining(mobile);
    }

    @Transactional
    public Integer countOffersByMasterAndDateBetween(Master master, Long startDate, Long endDate) {
        try {
            return offerService.findByMasterAndLastUpdateBetween(
                    master,
                    new DateTime(startDate).withTimeAtStartOfDay().toDate(),
                    new DateTime(endDate).plusDays(1).withTimeAtStartOfDay().toDate()
            ).size();
        } catch (Exception ex) {
            ex.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public Integer countOffersByMastersInAndDateBetween(List<Master> masters, Long startDate, Long endDate) {
        try {
            return offerService.findByMasterInAndLastUpdateBetween(
                    masters,
                    new DateTime(startDate).withTimeAtStartOfDay().toDate(),
                    new DateTime(endDate).plusDays(1).withTimeAtStartOfDay().toDate()
            ).size();
        } catch (Exception ex) {
            ex.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public Integer countAccountsByMasterAndDateBetween(Master master, Long startDate, Long endDate) {
        try {
            return accountService.findByCourseMasterAndRegisterDateBetween(
                    master,
                    new DateTime(startDate).withTimeAtStartOfDay().toDate(),
                    new DateTime(endDate).plusDays(1).withTimeAtStartOfDay().toDate()
            ).size();
        } catch (Exception ex) {
            ex.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public Integer countAccountsByMastersInAndDateBetween(List<Master> masters, Long startDate, Long endDate) {
        try {
            return accountService.findByCourseMasterInAndRegisterDateBetween(
                    masters,
                    new DateTime(startDate).withTimeAtStartOfDay().toDate(),
                    new DateTime(endDate).plusDays(1).withTimeAtStartOfDay().toDate()
            ).size();
        } catch (Exception ex) {
            ex.printStackTrace();
            return -1;
        }
    }

    @Transactional
    public Double countPaymentsByMasterAndDateBetween(Master master, Long startDate, Long endDate) {
        try {
            return paymentService.findByAccountCourseMasterAndDateBetween(
                    master,
                    new DateTime(startDate).withTimeAtStartOfDay().toDate(),
                    new DateTime(endDate).plusDays(1).withTimeAtStartOfDay().toDate()
            ).stream().mapToDouble(Payment::getAmountNumber).sum();
        } catch (Exception ex) {
            ex.printStackTrace();
            return -1.0;
        }
    }

    @Transactional
    public Double countPaymentsByMastersInAndDateBetween(List<Master> masters, Long startDate, Long endDate) {
        try {
            return paymentService.findByAccountCourseMasterInAndDateBetween(
                    masters,
                    new DateTime(startDate).withTimeAtStartOfDay().toDate(),
                    new DateTime(endDate).plusDays(1).withTimeAtStartOfDay().toDate()
            ).stream().mapToDouble(Payment::getAmountNumber).sum();
        } catch (Exception ex) {
            ex.printStackTrace();
            return -1.0;
        }
    }

    @Transactional
    public Integer getNextAccountCode(Course course){
        Account topAccount = accountService.findTopByCourseOrderByCodeDesc(course);
        if (topAccount == null) {
            return 1;
        } else {
            return topAccount.getCode() + 1;
        }
    }
}
