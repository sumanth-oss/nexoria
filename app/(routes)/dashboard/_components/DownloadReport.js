'use client';

import React from 'react';
import { Download } from 'lucide-react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '2px solid #39194f',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#39194f',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#666',
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  overallScore: {
    alignItems: 'center',
  },
  scoreCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
  },
  sectionScores: {
    flexDirection: 'row',
    gap: 16,
  },
  sectionScore: {
    alignItems: 'center',
  },
  smallCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  smallScoreText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  smallLabel: {
    fontSize: 7,
    color: '#666',
    textAlign: 'center',
    maxWidth: 40,
  },
  summaryBox: {
    backgroundColor: '#f8f4ff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    border: '1px solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#39194f',
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 9,
    color: '#4b5563',
    lineHeight: 1.3,
  },
  threeColumnContainer: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  column: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    border: '1px solid #e5e7eb',
  },
  strengthsColumn: {
    backgroundColor: '#f0fdf4',
  },
  improvementsColumn: {
    backgroundColor: '#fef2f2',
  },
  tipsColumn: {
    backgroundColor: '#eff6ff',
  },
  columnTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    marginTop: 3,
    marginRight: 6,
  },
  itemText: {
    fontSize: 8,
    color: '#4b5563',
    flex: 1,
    lineHeight: 1.2,
  },
});

const ReportDocument = ({ report }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return '#84cc16';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return '#f7fee7';
    if (score >= 60) return '#fef3c7';
    return '#fee2e2';
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nexoria AI Resume Analysis Report</Text>
          <Text style={styles.subtitle}>
            Generated on {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Score Section */}
        <View style={styles.scoreSection}>
          <View style={styles.overallScore}>
            <View
              style={[
                styles.scoreCircle,
                { backgroundColor: getScoreBgColor(report.overall_score) },
              ]}
            >
              <Text
                style={[
                  styles.scoreText,
                  { color: getScoreColor(report.overall_score) },
                ]}
              >
                {report.overall_score}
              </Text>
            </View>
            <Text style={styles.scoreLabel}>Overall Score</Text>
          </View>

          {/* Section Scores */}
          {report.sections && (
            <View style={styles.sectionScores}>
              {Object.entries(report.sections)
                .filter(([_, data]) => data.score)
                .slice(0, 4)
                .map(([section, data]) => (
                  <View key={section} style={styles.sectionScore}>
                    <View
                      style={[
                        styles.smallCircle,
                        { backgroundColor: getScoreBgColor(data.score) },
                      ]}
                    >
                      <Text
                        style={[
                          styles.smallScoreText,
                          { color: getScoreColor(data.score) },
                        ]}
                      >
                        {data.score}
                      </Text>
                    </View>
                    <Text style={styles.smallLabel}>
                      {section.replace('_', ' ')}
                    </Text>
                  </View>
                ))}
            </View>
          )}
        </View>

        {/* Summary */}
        <View style={styles.summaryBox}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summaryText}>{report.summary_comment}</Text>
        </View>

        {/* Three Column Layout */}
        <View style={styles.threeColumnContainer}>
          {/* Strengths */}
          <View style={[styles.column, styles.strengthsColumn]}>
            <Text style={styles.columnTitle}>✓ Strengths</Text>
            {report.whats_good?.slice(0, 6).map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={[styles.bullet, { backgroundColor: '#16a34a' }]} />
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Areas to Improve */}
          <View style={[styles.column, styles.improvementsColumn]}>
            <Text style={styles.columnTitle}>⚠ Areas to Improve</Text>
            {report.needs_improvement?.slice(0, 6).map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={[styles.bullet, { backgroundColor: '#dc2626' }]} />
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Improvement Tips */}
          <View style={[styles.column, styles.tipsColumn]}>
            <Text style={styles.columnTitle}>💡 Tips</Text>
            {report.tips_for_improvement?.slice(0, 6).map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={[styles.bullet, { backgroundColor: '#2563eb' }]} />
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const DownloadReport = ({ report }) => {
  return (
    <PDFDownloadLink
      document={<ReportDocument report={report} />}
      fileName={`Nexoria_Resume_Analysis_${
        new Date().toISOString().split('T')[0]
      }.pdf`}
    >
      {({ blob, url, loading, error }) => (
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#39194f] to-[#5b2a7a] text-white text-sm font-medium rounded-lg hover:from-[#2d1340] hover:to-[#4a2366] transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap disabled:opacity-50"
          disabled={loading}
        >
          <Download className="w-4 h-4" />
          {loading ? 'Generating...' : 'Download Report'}
        </button>
      )}
    </PDFDownloadLink>
  );
};

export default DownloadReport;
