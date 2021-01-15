/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useProjectDetailQuery } from '../../../gen/apollo-types';
import { colors } from '../../assets/styles/colors';
import Button from '../_shared/button/button';
import Handle from '../_shared/handle/handle';
import Header from '../_shared/header/header';
import ProgressBar from '../_shared/progress-bar/progress-bar';
import styles from './project-detail-style';

const accountId = '613ba210-651a-469c-a690-ad6ecc76a6d5'; // TODO: load from global context
const projectId = '7330da71-8e87-40a4-aba1-6a1fa0403abe';
const ProjectDetail = () => {
  const { loading, error, data, refetch } = useProjectDetailQuery({
    variables: { accountId, projectId },
    fetchPolicy: 'cache-and-network',
  });

  const project = data?.project.getBySiteEngineer;
  const report = data?.report.byProjectId;
  const [sucks, setSucks] = useState<Number>();
  const TOTAL_AMOUNT_WITH_VAT =
    (project?.contractValueMainAgreement || 0) +
    (project?.variationOrder || 0) +
    ((project?.contractValueMainAgreement || 0) +
      (project?.variationOrder || 0)) *
      0.15;

  const PROJECT_LENGTH_MONTH = dayjs(project?.intendedCommencementDate)
    .add(project?.contractTime || 0, 'days')
    .add(project?.extensionTimeApproved || 0, 'days')
    .diff(dayjs(project?.intendedCommencementDate), 'month');

  const sumOfLastPlanned = () => {
    report?.map((rep) => {
      console.log(rep.reportUnits);
      const sum = rep.reportUnits?.reduce((p, c) => p + (c?.planned || 0), 0);
      console.log(sum);
      setSucks(sum);
    });
  };

  return (
    <>
      <Header title="PMA" />

      <Handle
        {...{ loading, error, data, refetch: () => refetch({ accountId }) }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{project?.name}</Text>
        </View>

        <View style={styles.container}>
          {/* TODO: proper values */}
          {/* Still not the proper value */}
          <View style={{ marginBottom: 24 }}>
            <ProgressBar
              planned={project?.planned || 0}
              executed={project?.executed || 0}
            />
          </View>
          <View style={{ marginBottom: 12 }}>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>Project Name:</Text>
              <Text style={styles.value}>{project?.name}</Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 0 }]}>
              <Text style={styles.name}>Location:</Text>
              <Text style={styles.value}>{project?.location}</Text>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: colors.light2,
              borderBottomWidth: 1,
              marginBottom: 12,
            }}
          />

          <View style={{ marginBottom: 12 }}>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>Contractor:</Text>
              <Text style={styles.value}>{project?.contractor}</Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>Contract Signature Date:</Text>
              <Text style={styles.value}>
                {dayjs(project?.contract_signature_date).format('MMM DD, YYYY')}
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>
                Contract Value Main Agreement (Before VAT):
              </Text>
              <Text style={styles.value}>
                ETB {project?.contractValueMainAgreement}
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>Variation Order:</Text>
              <Text style={styles.value}>ETB {project?.variationOrder}</Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>Total Amount:</Text>
              <Text style={styles.value}>
                ETB{' '}
                {(project?.contractValueMainAgreement || 0) +
                  (project?.variationOrder || 0)}
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>VAT (15%):</Text>
              <Text style={styles.value}>
                ETB{' '}
                {((project?.contractValueMainAgreement || 0) +
                  (project?.variationOrder || 0)) *
                  0.15}
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 0 }]}>
              <Text style={styles.name}>
                Total Project Amount Including VAT:
              </Text>
              <Text style={styles.value}>ETB {TOTAL_AMOUNT_WITH_VAT}</Text>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: colors.light2,
              borderBottomWidth: 1,
              marginBottom: 12,
            }}
          />

          <View style={{ marginBottom: 12 }}>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>Contract Time:</Text>
              <Text style={styles.value}>{project?.contractTime} days</Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>Mobilization Time:</Text>
              <Text style={styles.value}>
                {project?.mobilizationTime || 0} days
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>Intended Commencement Date:</Text>
              <Text style={styles.value}>
                {dayjs(project?.intendedCommencementDate).format(
                  'MMM DD, YYYY'
                )}
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>
                Intended/Original Completion Date:
              </Text>
              <Text style={styles.value}>
                {dayjs(project?.contract_signature_date)
                  .add(project?.contractTime || 0, 'days')
                  .format('MMM DD, YYYY')}
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>Site Handover Date:</Text>
              <Text style={styles.value}>
                {dayjs(project?.siteHandoverDate).format('MMM DD, YYYY')}
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>Extension Time Approved:</Text>
              <Text style={styles.value}>
                {project?.extensionTimeApproved || 0} days
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={styles.name}>
                Revised/Projected Completion Date:
              </Text>
              <Text style={styles.value}>
                {dayjs(project?.contract_signature_date)
                  .add(project?.contractTime || 0, 'days')
                  .add(project?.extensionTimeApproved || 0, 'days')
                  .format('MMM DD, YYYY')}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: colors.light2,
              borderBottomWidth: 1,
              marginBottom: 12,
            }}
          />

          <View style={{ marginBottom: 12 }}>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>Time Elapsed (Up to Today):</Text>
              <Text style={styles.value}>
                {' '}
                {dayjs().diff(
                  dayjs(project?.intendedCommencementDate),
                  'days'
                )}{' '}
                days{' '}
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>Time Elapsed in %:</Text>
              <Text style={styles.value}>
                {(
                  (dayjs().diff(dayjs(project?.intendedCommencementDate)) /
                    dayjs(project?.intendedCommencementDate)
                      .add(project?.contractTime || 0, 'days')
                      .add(project?.extensionTimeApproved || 0, 'days')
                      .diff(dayjs(project?.intendedCommencementDate))) *
                  100
                ).toFixed(2)}{' '}
                %
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>
                Expected Average Monthly Performance:
              </Text>
              <Text style={styles.value}>
                {' '}
                {` ETB `}
                {(TOTAL_AMOUNT_WITH_VAT / PROJECT_LENGTH_MONTH).toFixed(2)}
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>
                Percentage of Work Planned In the last Report :
              </Text>
              <Text style={styles.value}>
                {' '}
                {(
                  (1 / PROJECT_LENGTH_MONTH / TOTAL_AMOUNT_WITH_VAT) *
                  100
                ).toFixed(2)}{' '}
                %
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>
                Percentage of Work Planned To-date:
              </Text>
              <Text style={[styles.value, { color: colors.warn }]}>TO DO</Text>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: colors.light2,
              borderBottomWidth: 1,
              marginBottom: 12,
            }}
          />

          <View style={{ marginBottom: 12 }}>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>
                Amount of Work Executed This Month:{' '}
              </Text>
              <Text style={styles.value}> Cal</Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>
                Percentage of Work Done This Month:{' '}
              </Text>
              <Text style={styles.value}> Cal</Text>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: colors.light2,
              borderBottomWidth: 1,
              marginBottom: 12,
            }}
          />

          <View style={{ marginBottom: 12 }}>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>Advance Sum Taken:</Text>
              <Text style={styles.value}> Cal</Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>Remaining Advance Repayment:</Text>
              <Text style={styles.value}> Cal</Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>
                Payment Certified (Before VAT) IPC.No. xx:
              </Text>
              <Text style={styles.value}> Cal</Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>Total Paid (Before VAT):</Text>
              <Text style={styles.value}> Cal</Text>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: colors.light2,
              borderBottomWidth: 1,
              marginBottom: 12,
            }}
          />

          <View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>Current Work Activity</Text>
              <Text style={styles.value}> Cal</Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>Major Problem: </Text>
              <Text style={styles.value}> Cal</Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>Site Adaptation:</Text>
              <Text style={styles.value}> Cal</Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>Advance Payment:</Text>
              <Text style={styles.value}> Cal</Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>Cement Payment: </Text>
              <Text style={styles.value}> Cal</Text>
            </View>
          </View>
        </View>
      </Handle>
    </>
  );
};

export default ProjectDetail;
