package com.alemcar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alemcar.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
