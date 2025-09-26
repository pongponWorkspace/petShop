import { ApiError, ApiErrorHandler, ApiResponse, LoadingManager } from '@/src/services';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

// Generic API hook
export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(async <R>(
    apiCall: () => Promise<ApiResponse<R>>,
    options: {
      showErrorModal?: boolean;
      onSuccess?: (data: R) => void;
      onError?: (error: ApiError) => void;
    } = {}
  ) => {
    const { showErrorModal = true, onSuccess, onError } = options;

    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();

      if (response.success && response.data) {
        setData(response.data as any);
        onSuccess?.(response.data);
      } else {
        throw new Error(response.error || 'Unknown error occurred');
      }
    } catch (err: any) {
      const apiError = ApiErrorHandler.handleError(err, showErrorModal);
      setError(apiError);
      onError?.(apiError);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}

// Loading state hook
export function useLoading() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const unsubscribe = LoadingManager.subscribe(setLoadingStates);
    return unsubscribe;
  }, []);

  return {
    loadingStates,
    isLoading: (key: string) => loadingStates[key] || false,
    hasAnyLoading: Object.values(loadingStates).some(Boolean),
  };
}

// Error modal hook
export function useErrorModal() {
  const showError = useCallback((error: ApiError | string, title?: string) => {
    const errorObj = typeof error === 'string'
      ? { code: 'CUSTOM_ERROR', message: error } as ApiError
      : error;

    Alert.alert(
      title || 'เกิดข้อผิดพลาด',
      errorObj.message,
      [{ text: 'ตกลง', style: 'default' }],
      { cancelable: true }
    );
  }, []);

  const showSuccess = useCallback((message: string, title: string = 'สำเร็จ') => {
    Alert.alert(
      title,
      message,
      [{ text: 'ตกลง', style: 'default' }],
      { cancelable: true }
    );
  }, []);

  const showConfirm = useCallback((
    message: string,
    onConfirm: () => void,
    options: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
    } = {}
  ) => {
    const { title = 'ยืนยัน', confirmText = 'ใช่', cancelText = 'ยกเลิก' } = options;

    Alert.alert(
      title,
      message,
      [
        { text: cancelText, style: 'cancel' },
        { text: confirmText, style: 'default', onPress: onConfirm }
      ],
      { cancelable: true }
    );
  }, []);

  return { showError, showSuccess, showConfirm };
}