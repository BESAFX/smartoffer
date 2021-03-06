package com.besafx.app.entity;

import com.besafx.app.service.AccountService;
import com.besafx.app.service.OfferService;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.decimal4j.util.DoubleRounder;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@Component
public class Offer implements Serializable {

    private final static Logger log = LoggerFactory.getLogger(Offer.class);

    private static final long serialVersionUID = 1L;

    @GenericGenerator(
            name = "offerSequenceGenerator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "OFFER_SEQUENCE"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    @Id
    @GeneratedValue(generator = "offerSequenceGenerator")
    private Long id;

    private Integer code;

    private String note;

    private String customerName;

    private String customerIdentityNumber;

    private String customerMobile;

    private String customerEmail;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    private String messageBody;

    private String masterPaymentType;

    @Column(columnDefinition = "boolean default true")
    private Boolean sendEmail;

    @Column(columnDefinition = "boolean default true")
    private Boolean sendSMS;

    private String messageSid;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    private String smsBody;

    @Column(columnDefinition = "Decimal(10,1) default '0.0'", nullable = false)
    private Double masterPrice;

    @Column(columnDefinition = "Decimal(10,1) default '0.0'", nullable = false)
    private Double masterDiscountAmount;

    @Column(columnDefinition = "Decimal(10,1) default '0.0'", nullable = false)
    private Double masterProfitAmount;

    @Column(columnDefinition = "Decimal(10,1) default '0.0'", nullable = false)
    private Double masterCreditAmount;

    private Boolean registered;

    @ManyToOne
    @JoinColumn(name = "master")
    private Master master;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastUpdate;

    @ManyToOne
    @JoinColumn(name = "last_person")
    private Person lastPerson;

    @OneToMany(mappedBy = "offer", fetch = FetchType.LAZY)
    private List<Call> calls = new ArrayList<>();

    @JsonCreator
    public static Offer Create(String jsonString) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Offer offer = mapper.readValue(jsonString, Offer.class);
        return offer;
    }

    public Double getNet() {
        try {
            if (this.masterPaymentType.equals("نقدي")) {
                return DoubleRounder.round(this.masterPrice - (this.masterPrice * this.masterDiscountAmount / 100), 2);
            } else {
                return DoubleRounder.round(this.masterPrice + (this.masterPrice * this.masterProfitAmount / 100), 2);
            }
        } catch (Exception ex) {
            return 0.0;
        }
    }

    public Double getDiscount() {
        try {
            return DoubleRounder.round(this.masterPrice * this.masterDiscountAmount / 100, 0);
        } catch (Exception ex) {
            return 0.0;
        }
    }
}
