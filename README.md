<h1 align="left">
  <img src="./assets/icon2.png" alt="EXT Icon" width="40" valign="top" />
  SGE-Extension
</h1>

The tools included in this extension enhance the way the School Management System delivers its functionality.

They provide:
- Layout improvements for better data visualisation
- Automatic form completion
- Generation of additional reports
- Simplified navigation between modules
- General usability enhancements

These features reduce the time previously spent on administrative tasks by school staff.

## Available on
<p align="left">
  <a href="https://chromewebstore.google.com/detail/extens%C3%A3o-sge/ojjaigcnfbfpfmemnmnebpipojclnaad">
    <img src="https://img.shields.io/badge/Chrome_Web_Store-Available-blue?logo=googlechrome">
  </a>
</p>

---

## Context

The School Management System (SGE) was initially released in 2005 as the academic control system for the Municipal Education Network of Belo Horizonte, MG – Brazil.

Although updated over time, several functional requirements from school unit staff remained unresolved.

To address this, field research and on-site observation were conducted, validating the following functionalities:

---

## Features – Version 1.7.1 (11/11/2025)

- Generation of absence reports including student justifications  
  *(Attendance Module > Absence Justification Register)*

- Improved layout and class navigation on the daily absence register screen  
  *(Attendance Module > Daily Absence Register)*

- Generation of attendance summary listings including dates, highlighting bars, exclusion of withdrawn students, and total absence counts  
  *(School Records Forms Module > Attendance Summary Listing)*

- Generation of student assessment forms with automatic completion based on student status  
  *(Report Card Module > Report Card)*

- Navigation to student management history from movement history screen  
  *(Movement Module > Movement History)*

- Shortcuts to frequently used modules from student management screen  
  *(Main Menu > Student Management Module)*

- Search by guardian details with navigation to movement history  
  *(Movement Module > Search by Guardian)*

- Generation of control reports for pedagogical record support  
  *(School Records Forms Module > Forms by Class)*

---

## Release Notes

- Added support for Full-Time attendance format (two sessions per day)
- New list navigation option in daily absence register
- Improved monthly consolidation formatting for transferred/reassigned students
- Warning message during withdrawal of students with extended-time accommodations

---

## Script Architecture

- **Content Scripts**: Injected into the SGE system, extending and modifying UI behaviour
- **Background Scripts**: Handle events, messaging, and persistent extension logic
- **Libraries**: PDF generation and manipulation utilities

## Permissions & Execution Model

This extension operates entirely on the client side and does not modify or interfere with any server-side logic of the SGE system.

All enhancements are implemented through browser-based scripting, leveraging existing application routes and endpoints of the system, strictly respecting the authenticated user’s permission level. The extension focuses on reusing and extending existing functionality through UI-level improvements and abstraction, following best practices in modular design and separation of concerns.

#### This approach ensures:
- No server-side modifications
- No changes to backend behaviour
- No bypassing of authentication or access control rules
- Full compliance with existing user roles and permissions

Routes, DOM selectors, IDs, and class names are specific to the current SGE system structure and are not fully represented in this repository.
