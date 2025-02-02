import React from 'react'
import { Page, Text, View, Document, StyleSheet, renderToFile } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export const MyPdf = ({ applicantJobDetails }: any) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{applicantJobDetails}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

// await renderToFile(<MyPdf />, `${__dirname}/${applicantJobDetails.resume}`);