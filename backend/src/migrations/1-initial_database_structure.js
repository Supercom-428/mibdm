'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "draw_form", deps: []
 * createTable "media", deps: []
 * createTable "company", deps: []
 * createTable "role", deps: []
 * createTable "uploaded_documents", deps: []
 * createTable "permissions", deps: [role]
 * createTable "draw_entrant", deps: [company]
 * createTable "payment_history", deps: [uploaded_documents]
 * createTable "draw_entrant_form", deps: [draw_entrant, draw_entrant]
 * createTable "reconciliation", deps: [draw_entrant, company]
 * createTable "draw_entries", deps: [draw_entrant]
 * createTable "user", deps: [role]
 * createTable "admin_actions_log", deps: [user]
 * createTable "weekly_draw", deps: [draw_entries]
 * createTable "weekly_draw_entries", deps: [draw_entries, weekly_draw]
 * createTable "weekly_draw_media", deps: [media, weekly_draw]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_database_structure",
    "created": "2020-05-08T05:49:15.571Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "draw_form",
                {
                    "formId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "form_id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "title": {
                        "type": Sequelize.STRING(255),
                        "field": "title",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "media",
                {
                    "id": {
                        "type": Sequelize.INTEGER(11),
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING(255),
                        "field": "name",
                        "allowNull": false
                    },
                    "contactName": {
                        "type": Sequelize.STRING(255),
                        "field": "contact_name",
                        "allowNull": true
                    },
                    "contactEmail": {
                        "type": Sequelize.STRING(255),
                        "field": "contact_email",
                        "allowNull": true
                    },
                    "contactNumber": {
                        "type": Sequelize.STRING(100),
                        "field": "contact_number",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "company",
                {
                    "id": {
                        "type": Sequelize.INTEGER(11),
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING(255),
                        "field": "name",
                        "unique": true,
                        "allowNull": false
                    },
                    "street1": {
                        "type": Sequelize.STRING(255),
                        "field": "street_1",
                        "allowNull": true
                    },
                    "street2": {
                        "type": Sequelize.STRING(255),
                        "field": "street_2",
                        "allowNull": true
                    },
                    "town": {
                        "type": Sequelize.STRING(100),
                        "field": "town",
                        "allowNull": true
                    },
                    "county": {
                        "type": Sequelize.STRING(100),
                        "field": "county",
                        "allowNull": true
                    },
                    "postcode": {
                        "type": Sequelize.STRING(10),
                        "field": "postcode",
                        "allowNull": true
                    },
                    "countryCode": {
                        "type": Sequelize.STRING(3),
                        "field": "country_code",
                        "allowNull": true
                    },
                    "email": {
                        "type": Sequelize.STRING(255),
                        "field": "email",
                        "allowNull": true
                    },
                    "companyNumber": {
                        "type": Sequelize.STRING(10),
                        "field": "company_number",
                        "allowNull": true
                    },
                    "phoneNumber": {
                        "type": Sequelize.STRING(60),
                        "field": "phone_number",
                        "allowNull": true
                    },
                    "isPayroll": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_payroll",
                        "defaultValue": "0",
                        "allowNull": true
                    },
                    "payrollReconciliationType": {
                        "type": Sequelize.STRING(20),
                        "field": "payroll_reconciliation_type",
                        "allowNull": true
                    },
                    "isSupporter": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_supporter",
                        "defaultValue": "0",
                        "allowNull": true
                    },
                    "isPatron": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_patron",
                        "defaultValue": "0",
                        "allowNull": true
                    },
                    "notes": {
                        "type": Sequelize.BLOB,
                        "field": "notes",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "role",
                {
                    "id": {
                        "type": Sequelize.INTEGER(11),
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "description": {
                        "type": Sequelize.STRING(100),
                        "field": "description",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "uploaded_documents",
                {
                    "documentId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "document_id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "filename": {
                        "type": Sequelize.STRING(255),
                        "field": "filename",
                        "allowNull": false
                    },
                    "pathToFile": {
                        "type": Sequelize.STRING(255),
                        "field": "path_to_file",
                        "allowNull": false
                    },
                    "engineId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "engine_id",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "permissions",
                {
                    "id": {
                        "type": Sequelize.INTEGER(11),
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "code": {
                        "type": Sequelize.STRING(60),
                        "field": "code",
                        "allowNull": false
                    },
                    "roleId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "role_id",
                        "references": {
                            "model": "role",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "draw_entrant",
                {
                    "id": {
                        "type": Sequelize.INTEGER(11),
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "companyId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "company_id",
                        "references": {
                            "model": "company",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "firstName": {
                        "type": Sequelize.STRING(255),
                        "field": "first_name",
                        "allowNull": false
                    },
                    "lastName": {
                        "type": Sequelize.STRING(255),
                        "field": "last_name",
                        "allowNull": false
                    },
                    "street1": {
                        "type": Sequelize.STRING(255),
                        "field": "street_1",
                        "allowNull": false
                    },
                    "street2": {
                        "type": Sequelize.STRING(255),
                        "field": "street_2",
                        "allowNull": true
                    },
                    "town": {
                        "type": Sequelize.STRING(100),
                        "field": "town",
                        "allowNull": false
                    },
                    "county": {
                        "type": Sequelize.STRING(100),
                        "field": "county",
                        "allowNull": true
                    },
                    "countryCode": {
                        "type": Sequelize.STRING(3),
                        "field": "country_code",
                        "allowNull": false
                    },
                    "postcode": {
                        "type": Sequelize.STRING(10),
                        "field": "postcode",
                        "allowNull": false
                    },
                    "email": {
                        "type": Sequelize.STRING(255),
                        "field": "email",
                        "allowNull": true
                    },
                    "phoneNumber": {
                        "type": Sequelize.STRING(100),
                        "field": "phone_number",
                        "allowNull": true
                    },
                    "isFormCopiedAndSentToBusiness": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_form_copied_and_sent_to_business",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "isDrawNumbersSentToEntrant": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_draw_numbers_sent_to_entrant",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "notes": {
                        "type": Sequelize.BLOB,
                        "field": "notes",
                        "allowNull": true
                    },
                    "payrollReference": {
                        "type": Sequelize.STRING(255),
                        "field": "payroll_reference",
                        "allowNull": true
                    },
                    "paymentFrequency": {
                        "type": Sequelize.STRING(100),
                        "field": "payment_frequency",
                        "allowNull": false
                    },
                    "paymentMethod": {
                        "type": Sequelize.STRING(100),
                        "field": "payment_method",
                        "allowNull": false
                    },
                    "balance": {
                        "type": Sequelize.FLOAT,
                        "field": "balance",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "isAddedToCrm": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_added_to_crm",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "isConsentGivenToContactLineManager": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_consent_given_to_contact_line_manager",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "status": {
                        "type": Sequelize.INTEGER(11),
                        "field": "status",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "payment_history",
                {
                    "paymentId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "payment_id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "date": {
                        "type": Sequelize.DATEONLY,
                        "field": "date",
                        "allowNull": false
                    },
                    "documentId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "document_id",
                        "references": {
                            "model": "uploaded_documents",
                            "key": "document_id"
                        },
                        "allowNull": false
                    },
                    "description": {
                        "type": Sequelize.STRING(255),
                        "field": "description",
                        "allowNull": false
                    },
                    "amount": {
                        "type": Sequelize.FLOAT,
                        "field": "amount",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "draw_entrant_form",
                {
                    "formId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "form_id",
                        "references": {
                            "model": "draw_entrant",
                            "key": "id"
                        },
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "entrantId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "entrant_id",
                        "references": {
                            "model": "draw_entrant",
                            "key": "id"
                        },
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "dateSent": {
                        "type": Sequelize.DATE,
                        "field": "date_sent",
                        "allowNull": true
                    },
                    "dateReceived": {
                        "type": Sequelize.DATE,
                        "field": "date_received",
                        "allowNull": true
                    },
                    "dateCopyReturned": {
                        "type": Sequelize.DATE,
                        "field": "date_copy_returned",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "reconciliation",
                {
                    "id": {
                        "type": Sequelize.INTEGER(11),
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "reference": {
                        "type": Sequelize.STRING(255),
                        "field": "reference",
                        "allowNull": true
                    },
                    "name": {
                        "type": Sequelize.STRING(255),
                        "field": "name",
                        "allowNull": true
                    },
                    "drawEntrantId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "draw_entrant_id",
                        "references": {
                            "model": "draw_entrant",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "companyId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "company_id",
                        "references": {
                            "model": "company",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "draw_entries",
                {
                    "entryNumber": {
                        "type": Sequelize.INTEGER(11),
                        "field": "entry_number",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "entrantId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "entrant_id",
                        "references": {
                            "model": "draw_entrant",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "user",
                {
                    "id": {
                        "type": Sequelize.INTEGER(11),
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "username": {
                        "type": Sequelize.STRING(100),
                        "field": "username",
                        "unique": true,
                        "allowNull": false
                    },
                    "password": {
                        "type": Sequelize.STRING(100),
                        "field": "password",
                        "allowNull": false
                    },
                    "firstName": {
                        "type": Sequelize.STRING(255),
                        "field": "first_name",
                        "allowNull": false
                    },
                    "lastName": {
                        "type": Sequelize.STRING(255),
                        "field": "last_name",
                        "allowNull": false
                    },
                    "emailAddress": {
                        "type": Sequelize.STRING(255),
                        "field": "email_address",
                        "allowNull": false
                    },
                    "roleId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "role_id",
                        "references": {
                            "model": "role",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "admin_actions_log",
                {
                    "id": {
                        "type": Sequelize.INTEGER(11),
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "userId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "user_id",
                        "references": {
                            "model": "user",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "timestamp": {
                        "type": Sequelize.DATE,
                        "field": "timestamp",
                        "defaultValue": Sequelize.Literal,
                        "allowNull": false
                    },
                    "description": {
                        "type": Sequelize.STRING(255),
                        "field": "description",
                        "allowNull": false
                    },
                    "pageUrl": {
                        "type": Sequelize.STRING(255),
                        "field": "page_url",
                        "allowNull": false
                    },
                    "requestType": {
                        "type": Sequelize.STRING(10),
                        "field": "request_type",
                        "allowNull": false
                    },
                    "data": {
                        "type": Sequelize.BLOB,
                        "field": "data",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "weekly_draw",
                {
                    "drawId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "draw_id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "date": {
                        "type": Sequelize.DATEONLY,
                        "field": "date",
                        "allowNull": false
                    },
                    "winningEntryId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "winning_entry_id",
                        "references": {
                            "model": "draw_entries",
                            "key": "entry_number"
                        },
                        "allowNull": true
                    },
                    "websitePositionNumber": {
                        "type": Sequelize.INTEGER(11),
                        "field": "website_position_number",
                        "allowNull": true
                    },
                    "isBlogAddedToWebsite": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_blog_added_to_website",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "isVideoOnYoutube": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_video_on_youtube",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "isSocialMediaPosted": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_social_media_posted",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "isPrizeMoneyPaid": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_prize_money_paid",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "isMailshotSent": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_mailshot_sent",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "isConsentSignedForPhotoAndVideo": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_consent_signed_for_photo_and_video",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "isAddedToInstagram": {
                        "type": Sequelize.INTEGER(1),
                        "field": "is_added_to_instagram",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "weekly_draw_entries",
                {
                    "entryId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "entry_id",
                        "references": {
                            "model": "draw_entries",
                            "key": "entry_number"
                        },
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "drawId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "draw_id",
                        "references": {
                            "model": "weekly_draw",
                            "key": "draw_id"
                        },
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "status": {
                        "type": Sequelize.INTEGER(11),
                        "field": "status",
                        "defaultValue": "0",
                        "allowNull": false
                    },
                    "paymentId": {
                        "type": Sequelize.STRING(255),
                        "field": "payment_id",
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "weekly_draw_media",
                {
                    "mediaId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "media_id",
                        "references": {
                            "model": "media",
                            "key": "id"
                        },
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "drawId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "draw_id",
                        "references": {
                            "model": "weekly_draw",
                            "key": "draw_id"
                        },
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "dateSent": {
                        "type": Sequelize.DATEONLY,
                        "field": "date_sent",
                        "allowNull": true
                    },
                    "datePublished": {
                        "type": Sequelize.DATEONLY,
                        "field": "date_published",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["permissions", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["admin_actions_log", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["draw_entrant", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["draw_entrant_form", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["draw_entries", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["draw_form", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["media", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["payment_history", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["company", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["reconciliation", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["role", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["uploaded_documents", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["user", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["weekly_draw", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["weekly_draw_entries", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["weekly_draw_media", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
