/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useProjectDetailQuery } from '../../../gen/apollo-types';
import { useAuth } from '../../app/states/auth/use-auth';
import { useMyProject } from '../../app/states/my-project/use-my-project';
import { colors } from '../../assets/styles/colors';
import Handle from '../_shared/handle/handle';
import Header from '../_shared/header/header';
import ProgressBar from '../_shared/progress-bar/progress-bar';
import styles from './project-detail-style';

const ProjectDetail = () => {
  const { account } = useAuth()[0];

  const { myProject } = useMyProject();

  const { loading, error, data, refetch } = useProjectDetailQuery({
    variables: { accountId: account?.id || '', projectId: myProject.id || '' },
    fetchPolicy: 'cache-and-network',
  });

  const project = data?.project.getBySiteEngineer;
  const report = data?.report.byProjectId;

  const [sumPlanned, setSumPlanned] = useState<number>(1);
  const [sumExecuted, setSumExecuted] = useState<number>(1);

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

  const sumOfLastPlanned = useCallback(() => {
    report?.map((rep) => {
      // console.log(rep.reportUnits);
      const sum = rep.reportUnits?.reduce((p, c) => p + (c?.planned || 0), 0);

      setSumPlanned(sum || 1);
    });
  }, [report]);

  const sumOfLastExecuted = useCallback(() => {
    report?.map((rep) => {
      // console.log(rep.reportUnits);
      const sum = rep.reportUnits?.reduce((p, c) => p + (c?.executed || 0), 0);
      setSumExecuted(sum || 1);
    });
  }, [report]);

  useEffect(() => {
    sumOfLastPlanned();
    sumOfLastExecuted();
  }, [sumOfLastExecuted, sumOfLastPlanned]);

  return (
    <>
      <Header title="PMA" />

      <Handle
        {...{
          loading,
          error,
          data,
          refetch: () => refetch({ accountId: account?.id || '' }),
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{project?.name}</Text>
        </View>

        <View style={styles.container}>
          {/* TODO: proper values */}
          {/* Still not the proper value */}
          <View style={{ marginBottom: 24 }}>
            <ProgressBar
              planned={(project?.planned || 0) / TOTAL_AMOUNT_WITH_VAT}
              executed={(project?.executed || 0) / TOTAL_AMOUNT_WITH_VAT}
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
                {' ETB '}
                {(TOTAL_AMOUNT_WITH_VAT / PROJECT_LENGTH_MONTH).toFixed(2)}
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>
                Percentage of Work Planned In the last Report :
              </Text>
              <Text style={styles.value}>
                {' '}
                {((sumPlanned / TOTAL_AMOUNT_WITH_VAT) * 100).toFixed(2)} %
              </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>
                Percentage of Work Planned To-date:
              </Text>
              <Text style={[styles.value]}>
                {' '}
                {(
                  ((project?.planned || 0) / TOTAL_AMOUNT_WITH_VAT) *
                  100
                ).toFixed(2)}{' '}
                %
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
              <Text style={[styles.name]}>
                Amount of Work Executed on Last report{' '}
              </Text>
              <Text style={styles.value}> {` ETB ${sumExecuted}`} </Text>
            </View>
            <View style={[styles.displayRow, { marginBottom: 24 }]}>
              <Text style={[styles.name]}>
                Percentage of Work Executed on Last report:{' '}
              </Text>
              <Text style={styles.value}>
                {' '}
                {((sumExecuted / TOTAL_AMOUNT_WITH_VAT) * 100).toFixed(2)} %
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
            <View style={[{ marginBottom: 24 }]}>
              <Text style={[styles.name]}>Current Work Activity</Text>
              <View>
                {report?.map((rep, key) => (
                  <Text key={key} style={styles.value}>
                    - {rep.current_work_problems}{' '}
                  </Text>
                ))}
              </View>
            </View>
            <View style={[{ marginBottom: 24 }]}>
              <Text style={[styles.name]}>Major Problem: </Text>
              <View>
                {report?.map((rep, key) => (
                  <Text key={key} style={styles.value}>
                    - {rep.major_problems}{' '}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Handle>
    </>
  );
};

export default ProjectDetail;
