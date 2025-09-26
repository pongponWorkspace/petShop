import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { api } from '../api/client';

import { Colors, Spacing, Typography } from '@/src/shared/constants/theme';
import { useApi, useErrorModal, useLoading } from '@/src/shared/hooks/useApi';
import { ApiService } from '../types/api.types';

// Example component showing how to use the new API services
export default function ServicesListExample() {
  const [services, setServices] = useState<ApiService[]>([]);
  const { loading, error, execute } = useApi<ApiService[]>();
  const { isLoading } = useLoading();
  const { showError, showSuccess, showConfirm } = useErrorModal();

  // Load services on component mount
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    await execute(
      () => api.services.getServices(1, 20),
      {
        onSuccess: (response) => {
          setServices(response.data || []);
        },
        onError: (error) => {
          console.error('Failed to load services:', error);
        }
      }
    );
  };

  const handleUseService = async (serviceId: string) => {
    showConfirm(
      'คุณต้องการใช้บริการนี้หรือไม่?',
      async () => {
        await execute(
          () => api.services.useService(serviceId),
          {
            onSuccess: (updatedService) => {
              showSuccess('ใช้บริการสำเร็จแล้ว');
              // Update local state
              setServices(prevServices =>
                prevServices.map(service =>
                  service.id === serviceId ? updatedService : service
                )
              );
            }
          }
        );
      },
      {
        title: 'ยืนยันการใช้บริการ',
        confirmText: 'ใช้บริการ',
        cancelText: 'ยกเลิก'
      }
    );
  };

  const getStatusText = (status: string) => {
    switch (status.toUpperCase()) {
      case 'READY_TO_USE':
        return 'พร้อมใช้งาน';
      case 'USED':
        return 'ใช้แล้ว';
      case 'EXPIRED':
        return 'หมดอายุ';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'READY_TO_USE':
        return Colors.light.success;
      case 'USED':
        return Colors.light.textSecondary;
      case 'EXPIRED':
        return Colors.light.error;
      default:
        return Colors.light.textSecondary;
    }
  };

  const renderServiceItem = ({ item }: { item: ApiService }) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => item.status === 'READY_TO_USE' && handleUseService(item.id)}
      disabled={item.status !== 'READY_TO_USE'}
    >
      <View style={styles.serviceContent}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <Text style={styles.purchaseDate}>ซื้อเมื่อ: {item.purchaseDate}</Text>
        {item.expiryDate && (
          <Text style={styles.expiryDate}>หมดอายุ: {item.expiryDate}</Text>
        )}
      </View>

      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
          {getStatusText(item.status)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>บริการของฉัน</Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderServiceItem}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadServices}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {loading ? 'กำลังโหลด...' : 'ไม่มีบริการในขณะนี้'}
            </Text>
          </View>
        }
      />

      {/* Loading indicator for individual actions */}
      {(isLoading('useService') || Object.keys(useLoading().loadingStates).some(key => key.startsWith('useService_'))) && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>กำลังดำเนินการ...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: Spacing.lg,
  },
  title: {
    ...Typography.h3,
    color: Colors.light.text,
    marginBottom: Spacing.lg,
    fontWeight: '600',
  },
  serviceItem: {
    backgroundColor: Colors.light.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceContent: {
    flex: 1,
    marginRight: Spacing.md,
  },
  serviceTitle: {
    ...Typography.h4,
    color: Colors.light.text,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  serviceDescription: {
    ...Typography.bodySmall,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.sm,
    lineHeight: Typography.bodySmall.lineHeight * 1.3,
  },
  purchaseDate: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
    fontSize: 11,
  },
  expiryDate: {
    ...Typography.caption,
    color: Colors.light.textSecondary,
    fontSize: 11,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '600',
    fontSize: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...Typography.body,
    color: Colors.light.textLight,
    fontWeight: '500',
  },
});