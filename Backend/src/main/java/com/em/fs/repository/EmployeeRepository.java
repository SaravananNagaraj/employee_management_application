package com.em.fs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.em.fs.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	boolean existsByEmailId(String emailId);
    boolean existsByMobileNo(String mobileNo);
    List<Employee> findByMobileNoOrEmailId(String mobileNo, String emailId);
}
