import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const options = {
  ticketTypes: [
    "Product",
    "LoadPlan",
    "Claims",
    "Reservation",
    "Customer Operation",
  ],
  productsByTicketType: {
    Product: [
      "smartkargo",
      "TPD",
      "TPL",
      "1T",
      "Notion",
      "TNX",
      "others",
      "Yellow AI",
      "OCR",
      "Shipsy",
      "GoComet",
    ],
    Claims: ["Claims", "Duty Tax"],
    Reservation: [
      "Adhoc booking request",
      "Booking amendment",
      "Booking canellation",
    ],
    "Customer Operation": ["Customer Operations"],
  },

  classificationsByProduct: {
    smartkargo: [
      "sales",
      "planning",
      "booking",
      "operation",
      "accounting",
      "configuration",
      "EDI message",
      "track/audit",
      "general",
      "reports",
    ],
    TPD: [
      "Content",
      "Security",
      "Track & Trace",
      "System",
      "Integration",
      "Create Order",
      "General",
    ],
    TPL: ["Mobile App", "Security", "Others", "Job Milestone", "Hubs"],
    "1T": [
      "Users",
      "Lanes",
      "Master Configuration",
      "Orders",
      "System",
      "Others",
      "OCR",
    ],
    Notion: ["Pages", "Users", "Database", "Others"],
    TNX: ["Users", "Orders", "Payment Plan", "Others"],
    Others: ["Requests", "Enquiries", "Others"],
    "Yellow AI": ["Configuration", "Others"],
    OCR: ["OCR Data", "OCR Report", "Configuration", "Others"],
    Shipsy: ["Configuration"],
    GoComet: ["Booking", "Log in"],
    LoadPlan: [
      "Booking confirmation",
      "CBA",
      "Delay Request",
      "Information emails",
      "Space enquiry",
      "Miscellaneous",
      "Flight Reopen",
      "Booking Cancellation",
    ],
    Claims: ["Cargo", "Delivery", "Chargeback"],
    "Duty Tax": ["Malaysia", "Singapore", "Thailand"],
    "Customer Operations": [
      "Order Creation",
      "Status Update",
      "No Action Needed",
    ],
  },
  subClassifications: {
    Product_smartkargo_sales: [
      "Stock Allocation",
      "Rate Line",
      "Spot Rate",
      "Capacity Allocation",
      "Others",
    ],
    Product_smartkargo_planning: [
      "Flight Schedule",
      "Route Control",
      "Manage Capacity",
      "Flight Control",
      "Flight Load Plan",
      "Others",
    ],
    Product_smartkargo_booking: [
      "Error",
      "Cancellation",
      "Update AWB Details",
      "Others",
    ],
    Product_smartkargo_operation: [
      "Acceptance",
      "Flight Planning",
      "Export Manifest",
      "Arrival",
      "Deliver",
      "Others",
    ],
    Product_smartkargo_accounting: [
      "AWB Rate Audit",
      "Credit Validation",
      "Exchange Rate",
      "Invoice",
      "Others",
    ],
    Product_smartkargo_configuration: [
      "Agent Master",
      "Users",
      "Capacity Master",
      "Message Configuration",
      "Role Master",
      "Partner Master",
      "Others",
    ],
    "Product_smartkargo_EDI message": [
      "FFM",
      "FWB",
      "FHL",
      "FFR",
      "FBL",
      "XML",
      "FSU",
      "Message Monitoring Backlog",
      "Others",
    ],
    "Product_smartkargo_track/audit": [
      "Track AWB",
      "AWB Audit Log",
      "Others",
    ],
    Product_smartkargo_general: ["System", "Enquiries", "Others"],
    Product_smartkargo_reports: [
      "Others",
      "Flight Performance",
      "GHA Tonnage",
    ],
    Product_TPD_Content: [
      "AWB Booking",
      "Usable Tracking Number",
      "Route Rack Pricing",
      "Business Customer Tier Pricing",
      "Airport Hub Address",
      "Order",
      "Order Item",
      "Freight Orders",
      "Console Tags",
      "Air Waybills",
      "Reassign Service Providers",
      "Bulk Cancellation",
      "Organizations",
      "Organization",
      "Products",
      "Payment Plans",
      "Payment Plan Items",
      "Others",
    ],
    Product_TPD_Security: ["Users", "Roles", "Role Users", "Others"],
    "Product_TPD_Track & Trace": ["Nil Details", "Data Correction", "Others"],
    Product_TPD_System: [
      "Countries",
      "Subdivisions",
      "UN/LOCODEs",
      "Airport",
      "Currencies",
      "Currency Rates",
      "Taxes",
      "Insurances",
      "Vehicle Types",
      "Package Types",
      "Airport Organization Services",
      "Airport Organization Services Tier",
      "Freight Base Tiers",
      "Freight Tiers",
      "Freight Tiers for Frieght Forwarders",
      "Organization whitelist Organization",
      "Airport Organization Package Types",
      "Commodities",
      "Document Templates",
      "Routes",
      "Others",
    ],
    Product_TPD_Integration: ["Global API", "Others"],
    "Product_TPD_Create Order": ["Single Order", "Bulk Order", "Others"],
    Product_TPD_General: ["System Performance", "Others"],
    "Product_TPL_Mobile App": ["Error", "Sign In", "Others"],
    Product_TPL_Security: ["Roles", "Role Users", "Others"],
    Product_TPL_Others: ["Others"],
    "Product_TPL_Job Milestone": [
      "Change Status",
      "Incomplete",
      "Duplicate Job IDs",
    ],
    Product_TPL_Hubs: ["Others", "Sorting Hub Scan"],
    Product_1T_Users: ["New", "Update", "Error", "Others"],
    Product_1T_Lanes: ["New", "Update", "Error", "Others"],
    "Product_1T_Master Configuration": [
      "Customer",
      "Service Provider",
      "Nodes",
      "Movements",
      "OCR",
      "Others",
    ],
    Product_1T_Orders: [
      "[Web] Order Generation",
      "[Web] Order Processing",
      "[Mobile] Order Processing",
      "Track and Trace",
      "Others",
    ],
    Product_1T_System: ["Performance", "Others"],
    Product_1T_Others: ["Others"],
    Product_1T_OCR: ["User"],
    Product_Notion_Pages: ["Deleted Pages", "Others"],
    Product_Notion_Users: ["Edit Access", "Others"],
    Product_Notion_Database: ["Templates", "Missing Data", "Others"],
    Product_Notion_Others: ["Others"],
    Product_TNX_Users: ["Unable to Login", "Others"],
    Product_TNX_Orders: ["Creation Error", "Server Error", "Others"],
    "Product_TNX_Payment Plan": ["Top Up"],
    Product_TNX_Others: ["Others", "Unable to"],
    Product_Others_Requests: [
      "Looker",
      "BigQuery",
      "SFTP",
      "JIRA",
      "Domain",
      "Others",
    ],
    Product_Others_Enquiries: ["Group Email"],
    Product_Others_Others: ["Others"],
    "Product_Yellow AI_Configuration": ["Login", "Status"],
    "Product_Yellow AI_Others": ["Others"],
    "Product_OCR_OCR Data": [
      "Missing Data",
      "Incorrect Data",
      "Verification",
    ],
    "Product_OCR_OCR Report": ["Report"],
    Product_OCR_Configuration: ["Account"],
    Product_OCR_Others: ["Others"],
    Product_Shipsy_Configuration: ["User", "Role"],
    Product_GoComet_Booking: ["Error", "HS code", "Others"],
    "Product_GoComet_Log in": ["Issue", "Others"],
    "LoadPlan_Booking confirmation": ["Narrow Body", "Wide Body"],
    "LoadPlan_Information emails": [
      "Cancellations",
      "Limitations",
      "Final load",
    ],
    Claims_Claims_Cargo: [
      "Damage",
      "Missing",
      "Delay",
      "Swap",
      "Penalty",
      "Others",
      "General Enquiry",
      "Status",
      "FTR",
      "Insurance",
    ],
    Claims_Claims_Delivery: [
      "Damage",
      "Missing",
      "Delay",
      "Swap",
      "Penalty",
      "Others",
      "General Enquiry",
      "Status",
      "FTR",
      "Insurance",
    ],
    Claims_Claims_Chargeback: ["CTO - Origin", "CTO - Dest", "Airlines"],
    "Claims_Duty Tax_Malaysia": [
      "Payment",
      "Delivery Status",
      "DDP",
      "Custom",
      "Others",
      "Invoice",
    ],
    "Claims_Duty Tax_Singapore": [
      "Payment",
      "Delivery Status",
      "DDP",
      "Custom",
      "Others",
      "Invoice",
    ],
    "Claims_Duty Tax_Thailand": [
      "Payment",
      "Delivery Status",
      "DDP",
      "Custom",
      "Others",
      "Invoice",
    ],
  },
  details: {
    "Product_smartkargo_sales_Stock Allocation": [
      "New",
      "Update",
      "Error",
      "Revoke/Return",
      "Balance Check",
      "Others",
    ],
    "Product_smartkargo_sales_Rate Line": [
      "New",
      "Update",
      "Error",
      "Others",
    ],
    "Product_smartkargo_sales_Spot Rate": [
      "New",
      "Update",
      "Error",
      "Others",
    ],
    "Product_smartkargo_sales_Capacity Allocation": [
      "New",
      "Update",
      "Error",
      "Others",
    ],
    Product_smartkargo_sales_Others: ["Others"],
    "Product_smartkargo_planning_Flight Schedule": [
      "Inaccurate Flight Schedule",
      "Nil Flights in SK",
      "DT/Truck",
      "Charter Flight Schedule",
      "Others",
    ],
    "Product_smartkargo_planning_Route Control": [
      "New",
      "Update",
      "Error",
      "Others",
    ],
    "Product_smartkargo_planning_Manage Capacity": [
      "Inaccurate AWB Data",
      "Send FBL Error",
      "Send CBA Error",
      "Others",
    ],
    "Product_smartkargo_planning_Flight Control": [
      "Inaccurate Data Capture",
      "Open/Close Flights",
      "Others",
    ],
    "Product_smartkargo_planning_Flight Load Plan": [
      "Nil Data",
      "Inaccurate Data Capture",
      "Missing Data",
      "Error",
      "Others",
    ],
    Product_smartkargo_planning_Others: ["Others"],
    Product_smartkargo_booking_Error: [
      "Nil AWB",
      "Missing AWB Details",
      "Inaccurate Data Capture",
      "Route Control Block",
      "Nil Allot ID",
      "Nil Subagent Code",
      "Invalid Bill to/Shipping Agent Code",
      "Status Change after Execute",
      "Others",
      "Planned Tab",
    ],
    Product_smartkargo_booking_Cancellation: [
      "Void",
      "Return to Shipper/Pulled Out",
      "Cancel AWB",
      "Others",
    ],
    "Product_smartkargo_booking_Update AWB Details": [
      "Others",
      "Planned Tab",
      "Update Route Legs",
      "Reopen AWB",
      "Interline",
      "POMAIL",
      "Booking Details",
      "Chargeable Weights",
      "Incorrect Currency",
      "Commodity Description",
      "Product Type",
    ],
    Product_smartkargo_booking_Others: ["Others"],
    Product_smartkargo_operation_Acceptance: [
      "Unable to Accept",
      "Wrongly Accepted",
      "FSU/RCS",
      "Others",
    ],
    "Product_smartkargo_operation_Flight Planning": [
      "Nil AWB",
      "Data Correction",
      "Unlock Flight",
      "Nil Cart/ULD No.",
      "Nil Tail No.",
      "Others",
    ],
    "Product_smartkargo_operation_Export Manifest": [
      "Nil AWB",
      "Data Correction",
      "Unable to Depart",
      "Send FFM/FWB/FHL Error",
      "Unlock Flight",
      "Nil Tail No.",
      "Wrongly Departed",
      "Others",
    ],
    Product_smartkargo_operation_Arrival: [
      "Nil AWB",
      "Data Correction",
      "Remove BUP Tagging",
      "Break ULD Error",
      "Others",
    ],
    Product_smartkargo_operation_Deliver: [
      "Nil AWB",
      "Data Correction",
      "Reopen DO",
      "Others",
    ],
    Product_smartkargo_operation_Others: ["Others"],
    "Product_smartkargo_accounting_AWB Rate Audit": [
      "Incorrect Data Capture",
      "Nil AWB",
      "Unable to Generate DO",
      "Transfer Billing Date",
      "Unable to List",
      "Others",
      "FOC Freight",
    ],
    "Product_smartkargo_accounting_Credit Validation": [
      "New",
      "Update",
      "Error",
      "Others",
    ],
    "Product_smartkargo_accounting_Exchange Rate": [
      "New",
      "Update",
      "Error",
      "Others",
    ],
    Product_smartkargo_accounting_Invoice: [
      "Inaccurate Data Capture",
      "Nil AWB",
      "Unable to List",
      "Others",
    ],
    Product_smartkargo_accounting_Others: ["Others"],
    "Product_smartkargo_configuration_Agent Master": [
      "New",
      "Update",
      "Error",
      "Others",
    ],
    Product_smartkargo_configuration_Users: [
      "New",
      "Update",
      "Forgot Password",
      "Unlock Account",
      "Terminate",
    ],
    "Product_smartkargo_configuration_Capacity Master": [
      "New",
      "Update",
      "Error",
      "Others",
    ],
    "Product_smartkargo_configuration_Message Configuration": [
      "New",
      "Update",
      "Error",
      "Others",
    ],
    "Product_smartkargo_configuration_Role Master": [
      "New",
      "Update",
      "Others",
    ],
    "Product_smartkargo_configuration_Partner Master": [
      "New",
      "Update",
      "Others",
    ],
    Product_smartkargo_configuration_Others: ["Others"],
    "Product_smartkargo_EDI Message_FFM": [
      "Retrigger (Outgoing)",
      "Reprocess (Incoming)",
      "Error",
    ],
    "Product_smartkargo_EDI Message_FWB": [
      "Retrigger (Outgoing)",
      "Reprocess (Incoming)",
      "Error",
    ],
    "Product_smartkargo_EDI Message_FHL": [
      "Retrigger (Outgoing)",
      "Reprocess (Incoming)",
      "Error",
    ],
    "Product_smartkargo_EDI Message_FFR": [
      "Retrigger (Outgoing)",
      "Reprocess (Incoming)",
      "Error",
    ],
    "Product_smartkargo_EDI Message_FBL": [
      "Retrigger (Outgoing)",
      "Reprocess (Incoming)",
      "Error",
    ],
    "Product_smartkargo_EDI Message_XML": [
      "Retrigger (Outgoing)",
      "Reprocess (Incoming)",
      "Server Error",
    ],
    "Product_smartkargo_EDI Message_FSU": [
      "Retrigger (Outgoing)",
      "Reprocess (Incoming)",
      "Error",
    ],
    "Product_smartkargo_EDI Message_Message Monitoring Backlog": [
      "Restart Message Queuing Service",
      "SITA/EDIfly  Issue",
    ],
    "Product_smartkargo_EDI Message_Others": ["Others"],
    "Product_smartkargo_track/audit_Track AWB": [
      "Nil AWB",
      "Data Correction",
      "Others",
    ],
    "Product_smartkargo_track/audit_AWB Audit Log": [
      "Data Correction",
      "Others",
    ],
    "Product_smartkargo_track/audit_Others": ["Others"],
    Product_smartkargo_general_System: ["Slow Performance"],
    Product_smartkargo_general_Enquiries: ["Enquiries"],
    Product_smartkargo_general_Others: ["Others"],
    "Product_smartkargo_reports_Flight Performance": ["Error"],
    "Product_TPD_Content_AWB Booking": [
      "Create",
      "Update",
      "Error",
      "Others",
    ],
    "Product_TPD_Content_Usable Tracking Number": [
      "Create",
      "Update",
      "Error",
      "Others",
    ],
    "Product_TPD_Content_Route Rack Pricing": [
      "Create",
      "Update",
      "Error",
      "Others",
    ],
    "Product_TPD_Content_Business Customer Tier Pricing": [
      "Create",
      "Update",
      "Error",
      "Others",
    ],
    "Product_TPD_Content_Airport Hub Address": [
      "Create",
      "Update",
      "Error",
      "Others",
    ],
    Product_TPD_Content_Order: ["Create", "Update", "Error", "Others"],
    "Product_TPD_Content_Order Item": ["Create", "Update", "Error", "Others"],
    "Product_TPD_Content_Freight Orders": [
      "Create",
      "Update",
      "Error",
      "Others",
    ],
    "Product_TPD_Content_Console Tags": [
      "Create",
      "Update",
      "Error",
      "Others",
    ],
    "Product_TPD_Content_Air Waybills": [
      "Create",
      "Update",
      "Error",
      "Others",
    ],
    "Product_TPD_Content_Reassign Service Providers": [
      "Tracking Number",
      "Console Tag",
      "Air Waybill",
      "Error",
      "Others",
    ],
    "Product_TPD_Content_Bulk Cancellation": [
      "Order Items",
      "Order",
      "Error",
      "Others",
    ],
    Product_TPD_Content_Organizations: [
      "Create",
      "Update",
      "Error",
      "Others",
    ],
    "Product_TPD_Content_Organization Address": [
      "Create",
      "Update",
      "Error",
      "Others",
    ],
    Product_TPD_Content_Products: ["Create", "Update", "Error", "Others"],
    "Product_TPD_Content_Payment Plans": [
      "Create",
      "Update",
      "Error",
      "Others",
    ],
    "Product_TPD_Content_Payment Plan Items": [
      "View",
      "Update",
      "Error",
      "Others",
    ],
    Product_TPD_Content_Others: ["Others"],
    "Product_TPL_Mobile App_Error": ["Error"],
    "Product_TPL_Mobile App_Sign In": ["IP Blocked", "Others"],
    "Product_TPL_Mobile App_Others": ["Others"],
    Product_TPL_Security_Roles: ["Create", "Update", "Others"],
    "Product_TPL_Security_Role Users": ["Create", "Update", "Others"],
    Product_TPL_Security_Others: ["Others"],
    Product_TPL_Others_Others: ["Others"],
    "Product_TPL_Job Milestone_Duplicate Job IDs": [
      "Others",
      "Cancel Duplicates",
    ],
    "Product_TPL_Hubs_Sorting Hub Scan": ["Others", "Unable to Scan"],
    Product_1T_Users_New: ["New"],
    Product_1T_Users_Update: ["Location", "Others"],
    Product_1T_Users_Error: ["Unable to Login", "Others"],
    Product_1T_Users_Others: ["Others"],
    Product_1T_Lanes_New: ["New"],
    Product_1T_Lanes_Update: ["Update"],
    Product_1T_Lanes_Error: ["Unable to Create Lane", "Others"],
    Product_1T_Lanes_Others: ["Others"],
    "Product_1T_Master Configuration_Customer": [
      "New",
      "Update",
      "Error",
      "Others",
    ],
    "Product_1T_Master Configuration_Service Provider": [
      "New",
      "Update",
      "Error",
      "Others",
    ],
    "Product_1T_Master Configuration_Nodes": [
      "New",
      "Update",
      "Error",
      "Others",
    ],
    "Product_1T_Master Configuration_Movements": [
      "New",
      "Update",
      "Error",
      "Others",
    ],
    "Product_1T_Master Configuration_OCR": ["Others", "OCR Dashboard Access"],
    "Product_1T_Master Configuration_Others": ["Others"],
    "Product_1T_Orders_[Web] Order Generation": [
      "Unable to Generate Documents",
      "Nil/Missing Orders",
      "Inaccurate Data Capture",
      "Order Upload Slow",
      "Order Upload Error",
      "Amend Destination",
      "Others",
    ],
    "Product_1T_Orders_[Web] Order Processing": [
      "Removed Items not Reflected",
      "Unable to Reassign",
      "Nil/Missing Orders",
      "Inaccurate Data Capture",
      "Others",
    ],
    "Product_1T_Orders_[Mobile] Order Processing": [
      "Unable to View Orders",
      "Nil/Missing Orders",
      "Inaccurate Data Capture",
      "Unable to Scan",
      "Others",
    ],
    "Product_1T_Orders_Track and Trace": [
      "Nil Details",
      "Inaccurate Data Capture",
      "Revert Status",
      "Update Status",
      "Others",
    ],
    Product_1T_Orders_Others: ["Others"],
    Product_1T_System_Performance: ["Slow", "Down"],
    Product_1T_System_Others: ["Others"],
    Product_1T_Others_Others: ["Others"],
    Product_1T_OCR_User: ["Create", "Unlock/Reset"],
    "Product_Notion_Pages_Deleted Pages": ["Restore", "Others"],
    Product_Notion_Pages_Others: ["Others"],
    "Product_Notion_Users_Edit Access": [
      "Grant Access",
      "Revoke Access",
      "Others",
    ],
    Product_Notion_Users_Others: ["Others"],
    Product_Notion_Database_Templates: ["New", "Update", "Others"],
    "Product_Notion_Database_Missing Data": ["Restore", "Others"],
    Product_Notion_Database_Others: ["Others"],
    Product_Notion_Others_Others: ["Others"],
    "Product_TNX_Users_Unable to Login": [
      "Nil Phone Number",
      "TNX Organization",
      "TNX Rate Card",
      "Others",
    ],
    Product_TNX_Users_Others: ["Others"],
    "Product_TNX_Orders_Creation Error": [
      "Wrong Payment Method Selected",
      "Postpaid - Nil Credit",
      "Payment Failure",
      "Others",
    ],
    "Product_TNX_Orders_Server Error": ["Exceed Character Limit", "Others"],
    Product_TNX_Orders_Others: ["Others"],
    "Product_TNX_Payment Plan_Top Up": ["Error"],
    Product_Others_Requests_Looker: ["Looker"],
    Product_Others_Requests_BigQuery: ["BigQuery"],
    Product_Others_Requests_SFTP: ["Access"],
    Product_Others_Requests_JIRA: ["JIRA"],
    Product_Others_Requests_Domain: ["Others"],
    "Product_Yellow AI_Configuration_Login": ["Unable to login"],
    "Product_Yellow AI_Configuration_Status": ["Unable Change status"],
    "Product_Yellow AI_Others_Others": ["Others"],
    "Product_OCR_OCR Data_Missing Data": [
      "Updated Data",
      "New Data",
      "Error",
      "Others",
    ],
    "Product_OCR_OCR Data_Incorrect Data": [
      "Date",
      "AWB Number",
      "Formala",
      "Other Details",
    ],
    "Product_OCR_OCR Data_Verification": [
      "New",
      "Update",
      "Error",
      "Missing Details",
      "Inaccurate details",
    ],
    "Product_OCR_OCR Report_Report": [
      "New",
      "Update",
      "Incorrect Data",
      "Others",
    ],
    Product_OCR_Configuration_Account: [
      "Reset Password",
      "Unable login",
      "Email Update",
    ],
    Product_OCR_Others_Others: ["Others"],
    Product_Shipsy_Configuration_User: [
      "New",
      "Update",
      "Terminate",
      "Others",
    ],
    Product_Shipsy_Configuration_Role: ["New", "Role Change"],
  },
}

function App() {
  const yAppWidgetRef = useRef(null);
  // const [options, setOptions] = useState({
  //   ticketTypes: [
  //     "Product",
  //     "LoadPlan",
  //     "Claims",
  //     "Reservation",
  //     "Customer Operation",
  //   ],
  //   productsByTicketType: {
  //     Product: [
  //       "smartkargo",
  //       "TPD",
  //       "TPL",
  //       "1T",
  //       "Notion",
  //       "TNX",
  //       "others",
  //       "Yellow AI",
  //       "OCR",
  //       "Shipsy",
  //       "GoComet",
  //     ],
  //     Claims: ["Claims", "Duty Tax"],
  //     Reservation: [
  //       "Adhoc booking request",
  //       "Booking amendment",
  //       "Booking canellation",
  //     ],
  //     "Customer Operation": ["Customer Operations"],
  //   },

  //   classificationsByProduct: {
  //     smartkargo: [
  //       "sales",
  //       "planning",
  //       "booking",
  //       "operation",
  //       "accounting",
  //       "configuration",
  //       "EDI message",
  //       "track/audit",
  //       "general",
  //       "reports",
  //     ],
  //     TPD: [
  //       "Content",
  //       "Security",
  //       "Track & Trace",
  //       "System",
  //       "Integration",
  //       "Create Order",
  //       "General",
  //     ],
  //     TPL: ["Mobile App", "Security", "Others", "Job Milestone", "Hubs"],
  //     "1T": [
  //       "Users",
  //       "Lanes",
  //       "Master Configuration",
  //       "Orders",
  //       "System",
  //       "Others",
  //       "OCR",
  //     ],
  //     Notion: ["Pages", "Users", "Database", "Others"],
  //     TNX: ["Users", "Orders", "Payment Plan", "Others"],
  //     Others: ["Requests", "Enquiries", "Others"],
  //     "Yellow AI": ["Configuration", "Others"],
  //     OCR: ["OCR Data", "OCR Report", "Configuration", "Others"],
  //     Shipsy: ["Configuration"],
  //     GoComet: ["Booking", "Log in"],
  //     LoadPlan: [
  //       "Booking confirmation",
  //       "CBA",
  //       "Delay Request",
  //       "Information emails",
  //       "Space enquiry",
  //       "Miscellaneous",
  //       "Flight Reopen",
  //       "Booking Cancellation",
  //     ],
  //     Claims: ["Cargo", "Delivery", "Chargeback"],
  //     "Duty Tax": ["Malaysia", "Singapore", "Thailand"],
  //     "Customer Operations": [
  //       "Order Creation",
  //       "Status Update",
  //       "No Action Needed",
  //     ],
  //   },
  //   subClassifications: {
  //     Product_smartkargo_sales: [
  //       "Stock Allocation",
  //       "Rate Line",
  //       "Spot Rate",
  //       "Capacity Allocation",
  //       "Others",
  //     ],
  //     Product_smartkargo_planning: [
  //       "Flight Schedule",
  //       "Route Control",
  //       "Manage Capacity",
  //       "Flight Control",
  //       "Flight Load Plan",
  //       "Others",
  //     ],
  //     Product_smartkargo_booking: [
  //       "Error",
  //       "Cancellation",
  //       "Update AWB Details",
  //       "Others",
  //     ],
  //     Product_smartkargo_operation: [
  //       "Acceptance",
  //       "Flight Planning",
  //       "Export Manifest",
  //       "Arrival",
  //       "Deliver",
  //       "Others",
  //     ],
  //     Product_smartkargo_accounting: [
  //       "AWB Rate Audit",
  //       "Credit Validation",
  //       "Exchange Rate",
  //       "Invoice",
  //       "Others",
  //     ],
  //     Product_smartkargo_configuration: [
  //       "Agent Master",
  //       "Users",
  //       "Capacity Master",
  //       "Message Configuration",
  //       "Role Master",
  //       "Partner Master",
  //       "Others",
  //     ],
  //     "Product_smartkargo_EDI message": [
  //       "FFM",
  //       "FWB",
  //       "FHL",
  //       "FFR",
  //       "FBL",
  //       "XML",
  //       "FSU",
  //       "Message Monitoring Backlog",
  //       "Others",
  //     ],
  //     "Product_smartkargo_track/audit": [
  //       "Track AWB",
  //       "AWB Audit Log",
  //       "Others",
  //     ],
  //     Product_smartkargo_general: ["System", "Enquiries", "Others"],
  //     Product_smartkargo_reports: [
  //       "Others",
  //       "Flight Performance",
  //       "GHA Tonnage",
  //     ],
  //     Product_TPD_Content: [
  //       "AWB Booking",
  //       "Usable Tracking Number",
  //       "Route Rack Pricing",
  //       "Business Customer Tier Pricing",
  //       "Airport Hub Address",
  //       "Order",
  //       "Order Item",
  //       "Freight Orders",
  //       "Console Tags",
  //       "Air Waybills",
  //       "Reassign Service Providers",
  //       "Bulk Cancellation",
  //       "Organizations",
  //       "Organization",
  //       "Products",
  //       "Payment Plans",
  //       "Payment Plan Items",
  //       "Others",
  //     ],
  //     Product_TPD_Security: ["Users", "Roles", "Role Users", "Others"],
  //     "Product_TPD_Track & Trace": ["Nil Details", "Data Correction", "Others"],
  //     Product_TPD_System: [
  //       "Countries",
  //       "Subdivisions",
  //       "UN/LOCODEs",
  //       "Airport",
  //       "Currencies",
  //       "Currency Rates",
  //       "Taxes",
  //       "Insurances",
  //       "Vehicle Types",
  //       "Package Types",
  //       "Airport Organization Services",
  //       "Airport Organization Services Tier",
  //       "Freight Base Tiers",
  //       "Freight Tiers",
  //       "Freight Tiers for Frieght Forwarders",
  //       "Organization whitelist Organization",
  //       "Airport Organization Package Types",
  //       "Commodities",
  //       "Document Templates",
  //       "Routes",
  //       "Others",
  //     ],
  //     Product_TPD_Integration: ["Global API", "Others"],
  //     "Product_TPD_Create Order": ["Single Order", "Bulk Order", "Others"],
  //     Product_TPD_General: ["System Performance", "Others"],
  //     "Product_TPL_Mobile App": ["Error", "Sign In", "Others"],
  //     Product_TPL_Security: ["Roles", "Role Users", "Others"],
  //     Product_TPL_Others: ["Others"],
  //     "Product_TPL_Job Milestone": [
  //       "Change Status",
  //       "Incomplete",
  //       "Duplicate Job IDs",
  //     ],
  //     Product_TPL_Hubs: ["Others", "Sorting Hub Scan"],
  //     Product_1T_Users: ["New", "Update", "Error", "Others"],
  //     Product_1T_Lanes: ["New", "Update", "Error", "Others"],
  //     "Product_1T_Master Configuration": [
  //       "Customer",
  //       "Service Provider",
  //       "Nodes",
  //       "Movements",
  //       "OCR",
  //       "Others",
  //     ],
  //     Product_1T_Orders: [
  //       "[Web] Order Generation",
  //       "[Web] Order Processing",
  //       "[Mobile] Order Processing",
  //       "Track and Trace",
  //       "Others",
  //     ],
  //     Product_1T_System: ["Performance", "Others"],
  //     Product_1T_Others: ["Others"],
  //     Product_1T_OCR: ["User"],
  //     Product_Notion_Pages: ["Deleted Pages", "Others"],
  //     Product_Notion_Users: ["Edit Access", "Others"],
  //     Product_Notion_Database: ["Templates", "Missing Data", "Others"],
  //     Product_Notion_Others: ["Others"],
  //     Product_TNX_Users: ["Unable to Login", "Others"],
  //     Product_TNX_Orders: ["Creation Error", "Server Error", "Others"],
  //     "Product_TNX_Payment Plan": ["Top Up"],
  //     Product_TNX_Others: ["Others", "Unable to"],
  //     Product_Others_Requests: [
  //       "Looker",
  //       "BigQuery",
  //       "SFTP",
  //       "JIRA",
  //       "Domain",
  //       "Others",
  //     ],
  //     Product_Others_Enquiries: ["Group Email"],
  //     Product_Others_Others: ["Others"],
  //     "Product_Yellow AI_Configuration": ["Login", "Status"],
  //     "Product_Yellow AI_Others": ["Others"],
  //     "Product_OCR_OCR Data": [
  //       "Missing Data",
  //       "Incorrect Data",
  //       "Verification",
  //     ],
  //     "Product_OCR_OCR Report": ["Report"],
  //     Product_OCR_Configuration: ["Account"],
  //     Product_OCR_Others: ["Others"],
  //     Product_Shipsy_Configuration: ["User", "Role"],
  //     Product_GoComet_Booking: ["Error", "HS code", "Others"],
  //     "Product_GoComet_Log in": ["Issue", "Others"],
  //     "LoadPlan_Booking confirmation": ["Narrow Body", "Wide Body"],
  //     "LoadPlan_Information emails": [
  //       "Cancellations",
  //       "Limitations",
  //       "Final load",
  //     ],
  //     Claims_Claims_Cargo: [
  //       "Damage",
  //       "Missing",
  //       "Delay",
  //       "Swap",
  //       "Penalty",
  //       "Others",
  //       "General Enquiry",
  //       "Status",
  //       "FTR",
  //       "Insurance",
  //     ],
  //     Claims_Claims_Delivery: [
  //       "Damage",
  //       "Missing",
  //       "Delay",
  //       "Swap",
  //       "Penalty",
  //       "Others",
  //       "General Enquiry",
  //       "Status",
  //       "FTR",
  //       "Insurance",
  //     ],
  //     Claims_Claims_Chargeback: ["CTO - Origin", "CTO - Dest", "Airlines"],
  //     "Claims_Duty Tax_Malaysia": [
  //       "Payment",
  //       "Delivery Status",
  //       "DDP",
  //       "Custom",
  //       "Others",
  //       "Invoice",
  //     ],
  //     "Claims_Duty Tax_Singapore": [
  //       "Payment",
  //       "Delivery Status",
  //       "DDP",
  //       "Custom",
  //       "Others",
  //       "Invoice",
  //     ],
  //     "Claims_Duty Tax_Thailand": [
  //       "Payment",
  //       "Delivery Status",
  //       "DDP",
  //       "Custom",
  //       "Others",
  //       "Invoice",
  //     ],
  //   },
  //   details: {
  //     "Product_smartkargo_sales_Stock Allocation": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Revoke/Return",
  //       "Balance Check",
  //       "Others",
  //     ],
  //     "Product_smartkargo_sales_Rate Line": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_smartkargo_sales_Spot Rate": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_smartkargo_sales_Capacity Allocation": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     Product_smartkargo_sales_Others: ["Others"],
  //     "Product_smartkargo_planning_Flight Schedule": [
  //       "Inaccurate Flight Schedule",
  //       "Nil Flights in SK",
  //       "DT/Truck",
  //       "Charter Flight Schedule",
  //       "Others",
  //     ],
  //     "Product_smartkargo_planning_Route Control": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_smartkargo_planning_Manage Capacity": [
  //       "Inaccurate AWB Data",
  //       "Send FBL Error",
  //       "Send CBA Error",
  //       "Others",
  //     ],
  //     "Product_smartkargo_planning_Flight Control": [
  //       "Inaccurate Data Capture",
  //       "Open/Close Flights",
  //       "Others",
  //     ],
  //     "Product_smartkargo_planning_Flight Load Plan": [
  //       "Nil Data",
  //       "Inaccurate Data Capture",
  //       "Missing Data",
  //       "Error",
  //       "Others",
  //     ],
  //     Product_smartkargo_planning_Others: ["Others"],
  //     Product_smartkargo_booking_Error: [
  //       "Nil AWB",
  //       "Missing AWB Details",
  //       "Inaccurate Data Capture",
  //       "Route Control Block",
  //       "Nil Allot ID",
  //       "Nil Subagent Code",
  //       "Invalid Bill to/Shipping Agent Code",
  //       "Status Change after Execute",
  //       "Others",
  //       "Planned Tab",
  //     ],
  //     Product_smartkargo_booking_Cancellation: [
  //       "Void",
  //       "Return to Shipper/Pulled Out",
  //       "Cancel AWB",
  //       "Others",
  //     ],
  //     "Product_smartkargo_booking_Update AWB Details": [
  //       "Others",
  //       "Planned Tab",
  //       "Update Route Legs",
  //       "Reopen AWB",
  //       "Interline",
  //       "POMAIL",
  //       "Booking Details",
  //       "Chargeable Weights",
  //       "Incorrect Currency",
  //       "Commodity Description",
  //       "Product Type",
  //     ],
  //     Product_smartkargo_booking_Others: ["Others"],
  //     Product_smartkargo_operation_Acceptance: [
  //       "Unable to Accept",
  //       "Wrongly Accepted",
  //       "FSU/RCS",
  //       "Others",
  //     ],
  //     "Product_smartkargo_operation_Flight Planning": [
  //       "Nil AWB",
  //       "Data Correction",
  //       "Unlock Flight",
  //       "Nil Cart/ULD No.",
  //       "Nil Tail No.",
  //       "Others",
  //     ],
  //     "Product_smartkargo_operation_Export Manifest": [
  //       "Nil AWB",
  //       "Data Correction",
  //       "Unable to Depart",
  //       "Send FFM/FWB/FHL Error",
  //       "Unlock Flight",
  //       "Nil Tail No.",
  //       "Wrongly Departed",
  //       "Others",
  //     ],
  //     Product_smartkargo_operation_Arrival: [
  //       "Nil AWB",
  //       "Data Correction",
  //       "Remove BUP Tagging",
  //       "Break ULD Error",
  //       "Others",
  //     ],
  //     Product_smartkargo_operation_Deliver: [
  //       "Nil AWB",
  //       "Data Correction",
  //       "Reopen DO",
  //       "Others",
  //     ],
  //     Product_smartkargo_operation_Others: ["Others"],
  //     "Product_smartkargo_accounting_AWB Rate Audit": [
  //       "Incorrect Data Capture",
  //       "Nil AWB",
  //       "Unable to Generate DO",
  //       "Transfer Billing Date",
  //       "Unable to List",
  //       "Others",
  //       "FOC Freight",
  //     ],
  //     "Product_smartkargo_accounting_Credit Validation": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_smartkargo_accounting_Exchange Rate": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     Product_smartkargo_accounting_Invoice: [
  //       "Inaccurate Data Capture",
  //       "Nil AWB",
  //       "Unable to List",
  //       "Others",
  //     ],
  //     Product_smartkargo_accounting_Others: ["Others"],
  //     "Product_smartkargo_configuration_Agent Master": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     Product_smartkargo_configuration_Users: [
  //       "New",
  //       "Update",
  //       "Forgot Password",
  //       "Unlock Account",
  //       "Terminate",
  //     ],
  //     "Product_smartkargo_configuration_Capacity Master": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_smartkargo_configuration_Message Configuration": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_smartkargo_configuration_Role Master": [
  //       "New",
  //       "Update",
  //       "Others",
  //     ],
  //     "Product_smartkargo_configuration_Partner Master": [
  //       "New",
  //       "Update",
  //       "Others",
  //     ],
  //     Product_smartkargo_configuration_Others: ["Others"],
  //     "Product_smartkargo_EDI Message_FFM": [
  //       "Retrigger (Outgoing)",
  //       "Reprocess (Incoming)",
  //       "Error",
  //     ],
  //     "Product_smartkargo_EDI Message_FWB": [
  //       "Retrigger (Outgoing)",
  //       "Reprocess (Incoming)",
  //       "Error",
  //     ],
  //     "Product_smartkargo_EDI Message_FHL": [
  //       "Retrigger (Outgoing)",
  //       "Reprocess (Incoming)",
  //       "Error",
  //     ],
  //     "Product_smartkargo_EDI Message_FFR": [
  //       "Retrigger (Outgoing)",
  //       "Reprocess (Incoming)",
  //       "Error",
  //     ],
  //     "Product_smartkargo_EDI Message_FBL": [
  //       "Retrigger (Outgoing)",
  //       "Reprocess (Incoming)",
  //       "Error",
  //     ],
  //     "Product_smartkargo_EDI Message_XML": [
  //       "Retrigger (Outgoing)",
  //       "Reprocess (Incoming)",
  //       "Server Error",
  //     ],
  //     "Product_smartkargo_EDI Message_FSU": [
  //       "Retrigger (Outgoing)",
  //       "Reprocess (Incoming)",
  //       "Error",
  //     ],
  //     "Product_smartkargo_EDI Message_Message Monitoring Backlog": [
  //       "Restart Message Queuing Service",
  //       "SITA/EDIfly  Issue",
  //     ],
  //     "Product_smartkargo_EDI Message_Others": ["Others"],
  //     "Product_smartkargo_track/audit_Track AWB": [
  //       "Nil AWB",
  //       "Data Correction",
  //       "Others",
  //     ],
  //     "Product_smartkargo_track/audit_AWB Audit Log": [
  //       "Data Correction",
  //       "Others",
  //     ],
  //     "Product_smartkargo_track/audit_Others": ["Others"],
  //     Product_smartkargo_general_System: ["Slow Performance"],
  //     Product_smartkargo_general_Enquiries: ["Enquiries"],
  //     Product_smartkargo_general_Others: ["Others"],
  //     "Product_smartkargo_reports_Flight Performance": ["Error"],
  //     "Product_TPD_Content_AWB Booking": [
  //       "Create",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_TPD_Content_Usable Tracking Number": [
  //       "Create",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_TPD_Content_Route Rack Pricing": [
  //       "Create",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_TPD_Content_Business Customer Tier Pricing": [
  //       "Create",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_TPD_Content_Airport Hub Address": [
  //       "Create",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     Product_TPD_Content_Order: ["Create", "Update", "Error", "Others"],
  //     "Product_TPD_Content_Order Item": ["Create", "Update", "Error", "Others"],
  //     "Product_TPD_Content_Freight Orders": [
  //       "Create",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_TPD_Content_Console Tags": [
  //       "Create",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_TPD_Content_Air Waybills": [
  //       "Create",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_TPD_Content_Reassign Service Providers": [
  //       "Tracking Number",
  //       "Console Tag",
  //       "Air Waybill",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_TPD_Content_Bulk Cancellation": [
  //       "Order Items",
  //       "Order",
  //       "Error",
  //       "Others",
  //     ],
  //     Product_TPD_Content_Organizations: [
  //       "Create",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_TPD_Content_Organization Address": [
  //       "Create",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     Product_TPD_Content_Products: ["Create", "Update", "Error", "Others"],
  //     "Product_TPD_Content_Payment Plans": [
  //       "Create",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_TPD_Content_Payment Plan Items": [
  //       "View",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     Product_TPD_Content_Others: ["Others"],
  //     "Product_TPL_Mobile App_Error": ["Error"],
  //     "Product_TPL_Mobile App_Sign In": ["IP Blocked", "Others"],
  //     "Product_TPL_Mobile App_Others": ["Others"],
  //     Product_TPL_Security_Roles: ["Create", "Update", "Others"],
  //     "Product_TPL_Security_Role Users": ["Create", "Update", "Others"],
  //     Product_TPL_Security_Others: ["Others"],
  //     Product_TPL_Others_Others: ["Others"],
  //     "Product_TPL_Job Milestone_Duplicate Job IDs": [
  //       "Others",
  //       "Cancel Duplicates",
  //     ],
  //     "Product_TPL_Hubs_Sorting Hub Scan": ["Others", "Unable to Scan"],
  //     Product_1T_Users_New: ["New"],
  //     Product_1T_Users_Update: ["Location", "Others"],
  //     Product_1T_Users_Error: ["Unable to Login", "Others"],
  //     Product_1T_Users_Others: ["Others"],
  //     Product_1T_Lanes_New: ["New"],
  //     Product_1T_Lanes_Update: ["Update"],
  //     Product_1T_Lanes_Error: ["Unable to Create Lane", "Others"],
  //     Product_1T_Lanes_Others: ["Others"],
  //     "Product_1T_Master Configuration_Customer": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_1T_Master Configuration_Service Provider": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_1T_Master Configuration_Nodes": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_1T_Master Configuration_Movements": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_1T_Master Configuration_OCR": ["Others", "OCR Dashboard Access"],
  //     "Product_1T_Master Configuration_Others": ["Others"],
  //     "Product_1T_Orders_[Web] Order Generation": [
  //       "Unable to Generate Documents",
  //       "Nil/Missing Orders",
  //       "Inaccurate Data Capture",
  //       "Order Upload Slow",
  //       "Order Upload Error",
  //       "Amend Destination",
  //       "Others",
  //     ],
  //     "Product_1T_Orders_[Web] Order Processing": [
  //       "Removed Items not Reflected",
  //       "Unable to Reassign",
  //       "Nil/Missing Orders",
  //       "Inaccurate Data Capture",
  //       "Others",
  //     ],
  //     "Product_1T_Orders_[Mobile] Order Processing": [
  //       "Unable to View Orders",
  //       "Nil/Missing Orders",
  //       "Inaccurate Data Capture",
  //       "Unable to Scan",
  //       "Others",
  //     ],
  //     "Product_1T_Orders_Track and Trace": [
  //       "Nil Details",
  //       "Inaccurate Data Capture",
  //       "Revert Status",
  //       "Update Status",
  //       "Others",
  //     ],
  //     Product_1T_Orders_Others: ["Others"],
  //     Product_1T_System_Performance: ["Slow", "Down"],
  //     Product_1T_System_Others: ["Others"],
  //     Product_1T_Others_Others: ["Others"],
  //     Product_1T_OCR_User: ["Create", "Unlock/Reset"],
  //     "Product_Notion_Pages_Deleted Pages": ["Restore", "Others"],
  //     Product_Notion_Pages_Others: ["Others"],
  //     "Product_Notion_Users_Edit Access": [
  //       "Grant Access",
  //       "Revoke Access",
  //       "Others",
  //     ],
  //     Product_Notion_Users_Others: ["Others"],
  //     Product_Notion_Database_Templates: ["New", "Update", "Others"],
  //     "Product_Notion_Database_Missing Data": ["Restore", "Others"],
  //     Product_Notion_Database_Others: ["Others"],
  //     Product_Notion_Others_Others: ["Others"],
  //     "Product_TNX_Users_Unable to Login": [
  //       "Nil Phone Number",
  //       "TNX Organization",
  //       "TNX Rate Card",
  //       "Others",
  //     ],
  //     Product_TNX_Users_Others: ["Others"],
  //     "Product_TNX_Orders_Creation Error": [
  //       "Wrong Payment Method Selected",
  //       "Postpaid - Nil Credit",
  //       "Payment Failure",
  //       "Others",
  //     ],
  //     "Product_TNX_Orders_Server Error": ["Exceed Character Limit", "Others"],
  //     Product_TNX_Orders_Others: ["Others"],
  //     "Product_TNX_Payment Plan_Top Up": ["Error"],
  //     Product_Others_Requests_Looker: ["Looker"],
  //     Product_Others_Requests_BigQuery: ["BigQuery"],
  //     Product_Others_Requests_SFTP: ["Access"],
  //     Product_Others_Requests_JIRA: ["JIRA"],
  //     Product_Others_Requests_Domain: ["Others"],
  //     "Product_Yellow AI_Configuration_Login": ["Unable to login"],
  //     "Product_Yellow AI_Configuration_Status": ["Unable Change status"],
  //     "Product_Yellow AI_Others_Others": ["Others"],
  //     "Product_OCR_OCR Data_Missing Data": [
  //       "Updated Data",
  //       "New Data",
  //       "Error",
  //       "Others",
  //     ],
  //     "Product_OCR_OCR Data_Incorrect Data": [
  //       "Date",
  //       "AWB Number",
  //       "Formala",
  //       "Other Details",
  //     ],
  //     "Product_OCR_OCR Data_Verification": [
  //       "New",
  //       "Update",
  //       "Error",
  //       "Missing Details",
  //       "Inaccurate details",
  //     ],
  //     "Product_OCR_OCR Report_Report": [
  //       "New",
  //       "Update",
  //       "Incorrect Data",
  //       "Others",
  //     ],
  //     Product_OCR_Configuration_Account: [
  //       "Reset Password",
  //       "Unable login",
  //       "Email Update",
  //     ],
  //     Product_OCR_Others_Others: ["Others"],
  //     Product_Shipsy_Configuration_User: [
  //       "New",
  //       "Update",
  //       "Terminate",
  //       "Others",
  //     ],
  //     Product_Shipsy_Configuration_Role: ["New", "Role Change"],
  //   },
  // });

  const [ticketType, setTicketType] = useState("");
  const [product, setProduct] = useState("");
  const [classification, setClassification] = useState("");
  const [subClassification, setSubClassification] = useState("");
  const [details, setDetails] = useState("");

  // useEffect(() => {
  //   const loadWidgetAndFetchData = () => {
  //     const script = document.createElement("script");
  //     script.type = "module";
  //     script.innerHTML = `
  //       import { YAppWidget } from "https://cdn.yellowmessenger.com/yapps-sdk/v1.0.0/widget.js";
  //       window.YellowAppWidgetInstance = new YAppWidget();
  //       window.YellowAppWidgetInstance.getTicketCF().then(data => {
  //         window.YellowAppWidgetData = data;
  //       }).catch(err => {
  //         window.YellowAppWidgetError = err;
  //       });
  //     `;
  //     document.body.appendChild(script);

  //     const interval = setInterval(() => {
  //       if (window.YellowAppWidgetData) {
  //         const customFields = window.YellowAppWidgetData || {};

  //         setOptions({
  //           ticketTypes: customFields.ticketTypes || [],
  //           productsByTicketType: customFields.productsByTicketType || {},
  //           classificationsByProduct: customFields.classificationsByProduct || {},
  //           subClassifications: customFields.subClassifications || {},
  //           details: customFields.details || {},
  //         });

  //         yAppWidgetRef.current = window.YellowAppWidgetInstance;

  //         clearInterval(interval);
  //         clearTimeout(timeout);
  //       }

  //       if (window.YellowAppWidgetError) {
  //         console.error("Error loading YellowAppWidget:", window.YellowAppWidgetError);
  //         clearInterval(interval);
  //         clearTimeout(timeout);
  //       }
  //     }, 500);

  //     const timeout = setTimeout(() => {
  //       console.error("Timeout loading YellowAppWidget data");
  //       clearInterval(interval);
  //     }, 10000);
  //   };

  //   loadWidgetAndFetchData();
  // }, []);
  useEffect(() => {
    const loadWidgetAndFetchData = () => {
      // Load the Yellow.ai widget as a module script
      const script = document.createElement("script");
      script.type = "module";
      script.innerHTML = `
        import { YAppWidget } from "https://cdn.yellowmessenger.com/yapps-sdk/v1.0.0/widget.js";
        window.YellowAppWidgetInstance = new YAppWidget();
        window.YellowAppWidgetInstance.ask("ask_ticket_cf_info")
          .then(data => {
            window.YellowAppWidgetData = data;
          })
          .catch(err => {
            console.error("Widget ask error:", err);
            window.YellowAppWidgetError = err;
          });
      `;
      document.body.appendChild(script);
  
      const interval = setInterval(() => {
        if (window.YellowAppWidgetData) {
          const data = window.YellowAppWidgetData;
          const customFields = data?.eventResponse?.eventData?.customFields || {};
  
          // setOptions({
          //   ticketTypes: customFields.ticketTypes || [],
          //   productsByTicketType: customFields.productsByTicketType || {},
          //   classificationsByProduct: customFields.classificationsByProduct || {},
          //   subClassifications: customFields.subClassifications || {},
          //   details: customFields.details || {},
          // });
  
          yAppWidgetRef.current = window.YellowAppWidgetInstance;
  
          clearInterval(interval);
          clearTimeout(timeout);
        }
  
        if (window.YellowAppWidgetError) {
          console.error("Failed to load widget data:", window.YellowAppWidgetError);
          clearInterval(interval);
          clearTimeout(timeout);
        }
      }, 500);
  
      const timeout = setTimeout(() => {
        console.error("Timed out waiting for YellowAppWidget data");
        clearInterval(interval);
      }, 10000);
    };
  
    loadWidgetAndFetchData();
  }, []);

  const productOptions =
    ticketType && ticketType !== "LoadPlan"
      ? options.productsByTicketType[ticketType] || []
      : [];

  const classificationOptions =
    ticketType === "LoadPlan"
      ? options.classificationsByProduct["LoadPlan"]
      : product
      ? options.classificationsByProduct[product] || []
      : [];

  const subClassificationKey = `${ticketType}_${product}_${classification}`;
  const subClassificationOptions =
    options.subClassifications[subClassificationKey] || [];

  const detailKey = `${ticketType}_${product}_${classification}_${subClassification}`;
  const detailOptions = options.details[detailKey] || [];

  const showProductDropdown =
    ticketType && ticketType !== "LoadPlan" && productOptions.length > 0;
  const showClassificationDropdown = classificationOptions.length > 0;
  const showSubClassificationDropdown = subClassificationOptions.length > 0;
  const showDetailsDropdown = detailOptions.length > 0;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const modifiedCustomFields = {
  //     s6: ticketType || "NA",
  //     s7: product || "NA",
  //     s8: classification || "NA",
  //     s9: subClassification || "NA",
  //     s10: details || "NA",
  //   };

  //   console.log("Submitting updated custom fields:", modifiedCustomFields);

  //   if (yAppWidgetRef.current) {
  //     try {
  //       await yAppWidgetRef.current.updateTicketCF(modifiedCustomFields);
  //       alert("Custom fields successfully updated.");
  //     } catch (err) {
  //       console.error("Update failed:", err);
  //       alert("Update failed.");
  //     }
  //   } else {
  //     alert("Widget not loaded yet.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const modifiedCustomFields = {
      s6: ticketType || "NA",
      s7: product || "NA",
      s8: classification || "NA",
      s9: subClassification || "NA",
      s10: details || "NA",
    };
  
    console.log("Submitting updated custom fields:", modifiedCustomFields);
  
    if (yAppWidgetRef.current) {
      try {
        const result = await yAppWidgetRef.current.update(
          "update_custom_fields",
          modifiedCustomFields
        );
        console.log("Successfully updated via .update():", result);
        alert("Custom fields successfully updated.");
      } catch (err) {
        console.error("Update failed:", err);
        alert("Update failed.");
      }
    } else {
      alert("Widget not loaded yet.");
    }
  };
  return (
    <div className="form-container">
      <h2>Custom Fields</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ticketType">Ticket Type *</label>
        <select
          id="ticketType"
          value={ticketType}
          onChange={(e) => {
            const newType = e.target.value;
            setTicketType(newType);
            setProduct("");
            setClassification("");
            setSubClassification("");
            setDetails("");
            if (newType === "LoadPlan") {
              setProduct("LoadPlan");
            }
          }}
        >
          <option value="">-- Select --</option>
          {options.ticketTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {showProductDropdown && (
          <>
            <label htmlFor="product">Product *</label>
            <select
              id="product"
              value={product}
              onChange={(e) => {
                setProduct(e.target.value);
                setClassification("");
                setSubClassification("");
                setDetails("");
              }}
            >
              <option value="">-- Select Product --</option>
              {productOptions.map((prod) => (
                <option key={prod} value={prod}>
                  {prod}
                </option>
              ))}
            </select>
          </>
        )}

        {showClassificationDropdown && (
          <>
            <label htmlFor="classification">Classification *</label>
            <select
              id="classification"
              value={classification}
              onChange={(e) => {
                setClassification(e.target.value);
                setSubClassification("");
                setDetails("");
              }}
            >
              <option value="">-- Select Classification --</option>
              {classificationOptions.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </>
        )}

        {showSubClassificationDropdown && (
          <>
            <label htmlFor="subClassification">Subclassification *</label>
            <select
              id="subClassification"
              value={subClassification}
              onChange={(e) => {
                setSubClassification(e.target.value);
                setDetails("");
              }}
            >
              <option value="">-- Select Subclassification --</option>
              {subClassificationOptions.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </>
        )}

        {showDetailsDropdown && (
          <>
            <label htmlFor="details">Details *</label>
            <select
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            >
              <option value="">-- Select Details --</option>
              {detailOptions.map((det) => (
                <option key={det} value={det}>
                  {det}
                </option>
              ))}
            </select>
          </>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;