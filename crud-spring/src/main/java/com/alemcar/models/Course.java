package com.alemcar.models;

import com.alemcar.enums.Category;
import com.alemcar.enums.Status;
import com.alemcar.enums.converters.CategoryConverter;
import com.alemcar.enums.converters.StatusConverter;
import jakarta.persistence.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Course {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @NotNull
  @Length(min = 5, max = 200)
  @Column(length = 200, nullable = false)
  private String name;

  @NotNull
  @Column(length = 10, nullable = false)
  @Convert(converter = CategoryConverter.class)
  private Category category;

  @NotNull
  @Column(length = 8, nullable = false)
  @Convert(converter = StatusConverter.class)
  private Status status = Status.ACTIVE;

  @Valid
  @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
  private Set<Lesson> lessons = new HashSet<>();
}
