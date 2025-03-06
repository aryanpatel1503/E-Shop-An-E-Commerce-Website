import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import {
  amountFormat,
  getFormattedDateTime,
  showLocalString,
} from "../../lib/commonFunctions";

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.6,
    // fontFamily: "Noto Sans",
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    width: "30%",
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
  },
  grandTotal: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
  },
});

// Define the main Invoice component
const Invoice = ({ item }) => {
  // console.log(item);
  // const currency = "\u20B9";
  const currency = "";

  // Define the InvoiceDocument component
  const InvoiceDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View>
          <Text style={styles.title}>Tax Invoice</Text>
        </View>

        <View style={styles.section}>
          <Text>Order ID: {item.order_id}</Text>
          <Text>Order Date: {getFormattedDateTime(item.order_date)}</Text>
        </View>

        <View style={styles.section}>
          <Text>Address:</Text>
          <Text>{item.order_name}</Text>
          <Text>{item.order_address}</Text>
          <Text>
            {item.order_state}, {item.order_pincode}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>Product Details:</Text>
          <View style={styles.table}>
            {/* Table Headers */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Product Title</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Qty</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Gross Amount</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Total</Text>
              </View>
            </View>
            {/* Table Data */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.product_name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>1</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {currency}
                  {amountFormat(item.product_price)}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {currency}
                  {amountFormat(item.product_price)}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Shipping Charges</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>1</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {currency}
                  {amountFormat(0)}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {currency}
                  {amountFormat(0)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.grandTotal}>
          Grand Total: {currency}
          {amountFormat(item.product_price)}
        </Text>
      </Page>
    </Document>
  );

  return (
    <div>
      <PDFDownloadLink
        document={<InvoiceDocument />}
        fileName={`order-${item.order_id}.pdf`}
        style={{
          backgroundColor: "#167269",
          color: "white",
          padding: "5px 10px",
          borderRadius: 5,
        }}
      >
        {({ loading }) =>
          loading ? "Loading document..." : "Download Invoice PDF"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Invoice;
