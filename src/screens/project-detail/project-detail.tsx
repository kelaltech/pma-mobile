/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React from 'react';
import { Text, View } from 'react-native';
import { useProjectDetailQuery } from '../../../gen/apollo-types';
import { useAuth } from '../../app/states/auth/use-auth';
import { colors } from '../../assets/styles/colors';
import Handle from '../_shared/handle/handle';
import Header from '../_shared/header/header';
import ProgressBar from '../_shared/progress-bar/progress-bar';
import styles from './project-detail-style';

const ProjectDetail = () => {
  const { account } = useAuth()[0];

  const { loading, error, data, refetch } = useProjectDetailQuery({
    variables: { accountId: account?.id || '' },
    fetchPolicy: 'cache-and-network',
  });

  const project = data?.project.getBySiteEngineer;

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
          <View style={{ marginBottom: 24 }}>
            <ProgressBar planned={75} executed={69} />
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
              <Text style={styles.value}>
                ETB{' '}
                {(project?.contractValueMainAgreement || 0) +
                  (project?.variationOrder || 0) +
                  ((project?.contractValueMainAgreement || 0) +
                    (project?.variationOrder || 0)) *
                    0.15}
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
        </View>
      </Handle>
    </>
  );
};

export default ProjectDetail;
