import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBluetooth } from '@/hooks/useBluetooth';
import DeviceItem from '@/components/DeviceItem';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/colors';
import { Bluetooth, RefreshCw } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function DevicesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    isBluetoothAvailable,
    permissionGranted,
    isScanning,
    devices,
    startScan,
    connectToDevice,
  } = useBluetooth();

  useEffect(() => {
    if (isBluetoothAvailable && permissionGranted) {
      startScan();
    }
  }, [isBluetoothAvailable, permissionGranted]);

  const handleDevicePress = async (device: any) => {
    try {
      await connectToDevice(device);
      router.push('/chat');
    } catch (error) {
      Alert.alert('Connection Error', 'Failed to connect to device. Please try again.');
    }
  };

  if (!isBluetoothAvailable && Platform.OS !== 'web') {
    return <EmptyState type="no-bluetooth" />;
  }

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Bluetooth size={24} color={Colors.primary} />
            <Text style={styles.headerTitle}>Bluetooth Connect</Text>
          </View>
          <Text style={styles.webNotice}>
            Note: Bluetooth functionality is limited on web. This is a simulation.
          </Text>
        </View>
        
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DeviceItem device={item} onPress={handleDevicePress} />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            !isScanning ? <EmptyState type="no-devices" /> : null
          }
        />
        
        <View style={[styles.footer, { paddingBottom: insets.bottom || 16 }]}>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={startScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <>
                <RefreshCw size={20} color={Colors.white} />
                <Text style={styles.scanButtonText}>Scan for Devices</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Bluetooth size={24} color={Colors.primary} />
          <Text style={styles.headerTitle}>Bluetooth Connect</Text>
        </View>
      </View>
      
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DeviceItem device={item} onPress={handleDevicePress} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !isScanning ? <EmptyState type="no-devices" /> : null
        }
      />
      
      <View style={[styles.footer, { paddingBottom: insets.bottom || 16 }]}>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={startScan}
          disabled={isScanning}
        >
          {isScanning ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <>
              <RefreshCw size={20} color={Colors.white} />
              <Text style={styles.scanButtonText}>Scan for Devices</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  webNotice: {
    fontSize: 12,
    color: Colors.lightText,
    marginTop: 8,
    fontStyle: 'italic',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  scanButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonText: {
    color: Colors.white,
    fontWeight: '600',
    marginLeft: 8,
  },
});
