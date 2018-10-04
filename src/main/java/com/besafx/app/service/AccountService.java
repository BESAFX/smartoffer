package com.besafx.app.service;

import com.besafx.app.entity.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public interface AccountService extends PagingAndSortingRepository<Account, Long>, JpaSpecificationExecutor<Account> {

    Account findTopByCourseOrderByCodeDesc(Course course);

    List<Account> findByStudent(Student student);

    List<Account> findByStudentContactMobileContaining(String mobile);

    List<Account> findByCourse(Course course);

    List<Account> findByCourseId(Long courseId);

    List<Account> findByCourseMaster(Master master);

    List<Account> findByCourseMasterAndRegisterDateBetween(Master master, @Temporal(TemporalType.TIMESTAMP) Date startDate, @Temporal(TemporalType.TIMESTAMP) Date endDate);

    List<Account> findByCourseMasterInAndRegisterDateBetween(List<Master> masters, @Temporal(TemporalType.TIMESTAMP) Date startDate, @Temporal(TemporalType.TIMESTAMP) Date endDate);

    List<Account> findByCourseMasterBranch(Branch branch);

    List<Account> findByCourseMasterBranchId(Long branchId, Pageable pageable);

    List<Account> findByCourseMasterBranchIdIn(List<Long> branchIds);
}
