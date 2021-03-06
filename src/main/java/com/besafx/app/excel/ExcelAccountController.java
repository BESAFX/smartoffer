package com.besafx.app.excel;

import com.besafx.app.entity.*;
import com.besafx.app.service.*;
import com.besafx.app.util.DateConverter;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.xssf.usermodel.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import java.awt.Color;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.math.BigInteger;
import java.security.Principal;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@RestController
public class ExcelAccountController {

    private final static Logger log = LoggerFactory.getLogger(ExcelAccountController.class);

    private SecureRandom random;

    private Integer day = null, month = null, year = null;

    @Autowired
    private CourseService courseService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private ContactService contactService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private PersonService personService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private ExcelCellHelper excelCellHelper;

    @PostConstruct
    public void init() {
        random = new SecureRandom();
    }

    @RequestMapping(value = "/api/heavy-work/account/write/{rowCount}", method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public void writeExcelFile(@PathVariable(value = "rowCount") Integer rowCount,
                               HttpServletResponse response,
                               Principal principal) {
        log.info("فحص المستخدم");
        Person person = personService.findByEmail(principal.getName());
        //
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet(person.getContact().getFirstName() + " " + person.getContact().getForthName() + " - " + " فرع " + person.getBranch().getName());
        Row row = sheet.createRow(0);
        row.setHeightInPoints((short) 25);
        //
        XSSFFont fontColumnHeader = workbook.createFont();
        fontColumnHeader.setBold(true);
        fontColumnHeader.setColor(IndexedColors.WHITE.getIndex());
        //
        XSSFFont fontCellDate = workbook.createFont();
        fontCellDate.setBold(true);
        fontCellDate.setColor(IndexedColors.BLACK.getIndex());
        //
        XSSFCellStyle styleColumnHeader = workbook.createCellStyle();
        styleColumnHeader.setFont(fontColumnHeader);
        styleColumnHeader.setAlignment(HorizontalAlignment.CENTER);
        styleColumnHeader.setVerticalAlignment(VerticalAlignment.CENTER);
        styleColumnHeader.setBorderTop(BorderStyle.THIN);
        styleColumnHeader.setBorderLeft(BorderStyle.THIN);
        styleColumnHeader.setBorderBottom(BorderStyle.THIN);
        styleColumnHeader.setBorderRight(BorderStyle.THIN);
        styleColumnHeader.setFillForegroundColor(new XSSFColor(Color.decode("#795548")));
        styleColumnHeader.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        //
        XSSFCellStyle styleCellDate = workbook.createCellStyle();
        styleCellDate.setFont(fontCellDate);
        styleCellDate.setAlignment(HorizontalAlignment.CENTER);
        styleCellDate.setVerticalAlignment(VerticalAlignment.CENTER);
        styleCellDate.setBorderTop(BorderStyle.THIN);
        styleCellDate.setBorderLeft(BorderStyle.THIN);
        styleCellDate.setBorderBottom(BorderStyle.THIN);
        styleCellDate.setBorderRight(BorderStyle.THIN);
        styleCellDate.setFillForegroundColor(new XSSFColor(Color.WHITE));
        styleCellDate.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        //
        Cell cell = row.createCell(0);
        cell.setCellValue("الاسم الأول");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(0, 20 * 256);
        //
        cell = row.createCell(1);
        cell.setCellValue("الاسم الثاني");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(1, 20 * 256);
        //
        cell = row.createCell(2);
        cell.setCellValue("الاسم الثالث");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(2, 20 * 256);
        //
        cell = row.createCell(3);
        cell.setCellValue("الاسم الرابع");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(3, 20 * 256);
        //
        cell = row.createCell(4);
        cell.setCellValue("رقم البطاقة / الإقامة");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(4, 20 * 256);
        //
        cell = row.createCell(5);
        cell.setCellValue("مكان الإصدار");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(5, 20 * 256);
        //
        cell = row.createCell(6);
        cell.setCellValue("المؤهل");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(6, 20 * 256);
        //
        cell = row.createCell(7);
        cell.setCellValue("مكان الميلاد");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(7, 20 * 256);
        //
        cell = row.createCell(8);
        cell.setCellValue("الجنسية");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(8, 20 * 256);
        //
        cell = row.createCell(9);
        cell.setCellValue("رقم الجوال");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(9, 20 * 256);
        //
        cell = row.createCell(10);
        cell.setCellValue("رقم الهاتف");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(10, 20 * 256);
        //
        cell = row.createCell(11);
        cell.setCellValue("العنوان");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(11, 20 * 256);
        //
        cell = row.createCell(12);
        cell.setCellValue("ملاحظات");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(12, 20 * 256);
        //
        cell = row.createCell(13);
        cell.setCellValue("طريقة الدفع");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(13, 20 * 256);
        //
        cell = row.createCell(14);
        cell.setCellValue("المبلغ نقداً");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(14, 20 * 256);
        //
        cell = row.createCell(15);
        cell.setCellValue("رقم الفرع");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(15, 20 * 256);
        //
        cell = row.createCell(16);
        cell.setCellValue("رقم التخصص");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(16, 20 * 256);
        //
        cell = row.createCell(17);
        cell.setCellValue("رقم الدورة");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(17, 20 * 256);
        //
        cell = row.createCell(18);
        cell.setCellValue("يوم التسجيل");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(18, 20 * 256);
        //
        cell = row.createCell(19);
        cell.setCellValue("شهر التسجيل");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(19, 20 * 256);
        //
        cell = row.createCell(20);
        cell.setCellValue("سنة التسجيل");
        cell.setCellType(CellType.STRING);
        cell.setCellStyle(styleColumnHeader);
        sheet.setColumnWidth(20, 20 * 256);
        //
        for (int i = 1; i <= rowCount; i++) {
            row = sheet.createRow(i);
            row.setHeightInPoints((short) 25);
            //
            for (int j = 0; j <= 20; j++) {
                cell = row.createCell(j);
                cell.setCellType(CellType.STRING);
                cell.setCellValue("---");
                cell.setCellStyle(styleCellDate);
            }
        }
        //
        XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper(sheet);
        XSSFDataValidationConstraint dvConstraint = (XSSFDataValidationConstraint) dvHelper.createExplicitListConstraint(new String[]{"نقدي", "قسط شهري"});
        CellRangeAddressList addressList = new CellRangeAddressList(1, rowCount, 13, 13);
        XSSFDataValidation validation = (XSSFDataValidation) dvHelper.createValidation(dvConstraint, addressList);
        validation.setShowErrorBox(true);
        validation.setErrorStyle(DataValidation.ErrorStyle.STOP);
        validation.createErrorBox("العروض الذكية", "فضلاً اختر طريقة الدفع دون تعديل من القائمة.");
        sheet.addValidationData(validation);
        //
        try {
            response.setContentType("application/xlsx");
            response.setHeader("Content-Disposition", "attachment; filename=\"SmartManager-HeavyWork-Account-Insert.xlsx\"");
            OutputStream outputStream = response.getOutputStream();
            workbook.write(outputStream);
            workbook.close();
            outputStream.flush();
            outputStream.close();
        } catch (Exception e) {
            log.info(e.getMessage());
        }

    }

    @RequestMapping(value = "/api/heavy-work/account/read", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void readExcelFile(@RequestParam("file") MultipartFile multipartFile, Principal principal) {
        Person person = personService.findByEmail(principal.getName());
        try {
            List<Account> accountList = new ArrayList<>();
            //
            File tempFile = File.createTempFile(new BigInteger(130, random).toString(32), "." + FilenameUtils.getExtension(multipartFile.getOriginalFilename()));
            FileUtils.writeByteArrayToFile(tempFile, multipartFile.getBytes());
            FileInputStream fileInputStream = new FileInputStream(tempFile);
            //
            Workbook workbook = new XSSFWorkbook(fileInputStream);
            Sheet dataTypeSheet = workbook.getSheetAt(0);
            //
            Iterator<Row> iterator = dataTypeSheet.iterator();
            log.info("تجاهل الصف الأول من الجدول والذي يحتوي على رؤوس الأعمدة");
            if (iterator.hasNext()) iterator.next();
            while (iterator.hasNext()) {
                Row nextRow = iterator.next();
                Iterator<Cell> cellIterator = nextRow.cellIterator();
                Integer courseCode = null, masterCode = null, branchCode = null;
                Contact contact = new Contact();
                Student student = new Student();
                Account account = new Account();
                boolean accept = true;
                while (cellIterator.hasNext()) {
                    Cell nextCell = cellIterator.next();
                    int columnIndex = nextCell.getColumnIndex();
                    switch (columnIndex) {
                        case 0:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            contact.setFirstName((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 1:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            contact.setSecondName((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 2:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            contact.setThirdName((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 3:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            contact.setForthName((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 4:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            contact.setIdentityNumber((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 5:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            contact.setIdentityLocation((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 6:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            contact.setQualification((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 7:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            contact.setBirthLocation((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 8:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            contact.setNationality((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 9:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            contact.setMobile((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 10:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            contact.setPhone((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 11:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            contact.setAddress((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 12:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            account.setNote((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 13:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            account.setCoursePaymentType((String) excelCellHelper.getCellValue(nextCell));
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 14:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            Double masterPrice;
                            try {
                                masterPrice = Double.parseDouble((String) excelCellHelper.getCellValue(nextCell));
                            } catch (Exception ex) {
                                accept = false;
                                break;
                            }
                            account.setCoursePrice(masterPrice);
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 15:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            try {
                                branchCode = Integer.parseInt((String) excelCellHelper.getCellValue(nextCell));
                            } catch (Exception ex) {
                                accept = false;
                                break;
                            }
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 16:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            try {
                                masterCode = Integer.parseInt((String) excelCellHelper.getCellValue(nextCell));
                            } catch (Exception ex) {
                                accept = false;
                                break;
                            }
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 17:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            try {
                                courseCode = Integer.parseInt((String) excelCellHelper.getCellValue(nextCell));
                            } catch (Exception ex) {
                                accept = false;
                                break;
                            }
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 18:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            try {
                                day = Integer.parseInt((String) excelCellHelper.getCellValue(nextCell));
                            } catch (Exception ex) {
                                accept = false;
                                break;
                            }
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 19:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            try {
                                month = Integer.parseInt((String) excelCellHelper.getCellValue(nextCell));
                            } catch (Exception ex) {
                                accept = false;
                                break;
                            }
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                        case 20:
                            if (excelCellHelper.getCellValue(nextCell) == null) {
                                accept = false;
                            }
                            nextCell.setCellType(CellType.STRING);
                            try {
                                year = Integer.parseInt((String) excelCellHelper.getCellValue(nextCell));
                            } catch (Exception ex) {
                                accept = false;
                                break;
                            }
                            log.info((String) excelCellHelper.getCellValue(nextCell));
                            break;
                    }

                }
                if (accept) {
                    try {
                        Course course = courseService.findByCodeAndMasterCodeAndMasterBranchCode(courseCode, masterCode, branchCode);
                        if (course == null) {
                            continue;
                        }
                        log.info("تم إيجاد الدورة تحت إشراف المدرب / " + course.getInstructor());
                        account.setCourse(course);
                        Account topAccount = accountService.findTopByCourseOrderByCodeDesc(course);
                        if (topAccount == null) {
                            account.setCode(1);
                        } else {
                            account.setCode(topAccount.getCode() + 1);
                        }
                        Date date = DateConverter.getDateFromHijri(year, month, day);
                        account.setRegisterDate(date);
                        account.setLastUpdate(date);
                        account.setLastPerson(person);
                        Student tempStudent = studentService.findByContactIdentityNumber(contact.getIdentityNumber().toLowerCase().trim());
                        if (tempStudent == null) {
                            student.setContact(contactService.save(contact));
                            account.setStudent(studentService.save(student));
                        } else {
                            account.setStudent(tempStudent);
                        }
                        account.setCourseCreditAmount(0.0);
                        account.setCourseDiscountAmount(0.0);
                        account.setCourseProfitAmount(0.0);
                        accountList.add(account);
                        accountService.save(account);
                    } catch (Exception ex) {
                        log.info(ex.getMessage());
                    }
                }
            }
            notificationService.notifyOne(Notification
                    .builder()
                    .title("العمليات على تسجيل الطلاب")
                    .message("تم اضافة عدد " + accountList.size() + " من التسجيلات بنجاح.")
                    .type("success")
                    .icon("fa-plus-circle")
                    .build(), principal.getName());
            workbook.close();
            fileInputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
