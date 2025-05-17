import React from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useBluetoothStore } from '@/store/bluetoothStore';
import { Info, Trash2, HelpCircle, Shield, Clock, Bluetooth } from 'lucide-react-native';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { clearDevices } = useBluetoothStore();
  const [autoConnect, setAutoConnect] = React.useState(false);
  const [saveHistory, setSaveHistory] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);
  const [discoverable, setDiscoverable] = React.useState(false);

  const handleClearDevices = () => {
    Alert.alert(
      'Clear Device History',
      'Are you sure you want to clear all saved devices?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            clearDevices();
            Alert.alert('Success', 'Device history has been cleared.');
          }
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About Bluetooth Connect',
      'Version 1.0.0\n\nA simple app to connect and chat with nearby Bluetooth devices.\n\nThis is a demo app created for educational purposes.',
      [{ text: 'OK' }]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      'Help & Support',
      'To use this app:\n\n1. Go to Devices tab and scan for nearby devices\n2. Tap on a device to connect\n3. Once connected, go to Chat tab to send messages\n\nFor more help, visit our website.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom || 20 }}
    >
      <View style={styles.header}>
        <Bluetooth size={32} color={Colors.primary} />
        <Text style={styles.headerTitle}>Bluetooth Connect</Text>
        <Text style={styles.headerSubtitle}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connection</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Auto-connect to known devices</Text>
            <Text style={styles.settingDescription}>
              Automatically connect to previously paired devices when in range
            </Text>
          </View>
          <Switch
            value={autoConnect}
            onValueChange={setAutoConnect}
            trackColor={{ false: Colors.border, true: `${Colors.primary}80` }}
            thumbColor={autoConnect ? Colors.primary : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Discoverable</Text>
            <Text style={styles.settingDescription}>
              Allow other devices to find your device via Bluetooth
            </Text>
          </View>
          <Switch
            value={discoverable}
            onValueChange={setDiscoverable}
            trackColor={{ false: Colors.border, true: `${Colors.primary}80` }}
            thumbColor={discoverable ? Colors.primary : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data & Privacy</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Save message history</Text>
            <Text style={styles.settingDescription}>
              Keep a record of your conversations with connected devices
            </Text>
          </View>
          <Switch
            value={saveHistory}
            onValueChange={setSaveHistory}
            trackColor={{ false: Colors.border, true: `${Colors.primary}80` }}
            thumbColor={saveHistory ? Colors.primary : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Notifications</Text>
            <Text style={styles.settingDescription}>
              Receive alerts when devices connect or messages arrive
            </Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: Colors.border, true: `${Colors.primary}80` }}
            thumbColor={notifications ? Colors.primary : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        
        <TouchableOpacity style={styles.actionItem} onPress={handleClearDevices}>
          <View style={styles.actionIconContainer}>
            <Trash2 size={20} color={Colors.error} />
          </View>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>Clear device history</Text>
            <Text style={styles.actionDescription}>
              Remove all saved devices and connection history
            </Text>
          </View>
        </TouchableOpacity>

        {Platform.OS !== 'web' && (
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconContainer}>
              <Clock size={20} color={Colors.primary} />
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>Connection timeout</Text>
              <Text style={styles.actionDescription}>
                Adjust how long to wait when connecting to devices
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.actionItem} onPress={handleHelp}>
          <View style={styles.actionIconContainer}>
            <HelpCircle size={20} color={Colors.primary} />
          </View>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>Help & Support</Text>
            <Text style={styles.actionDescription}>
              Get help with using the app and troubleshooting
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={handleAbout}>
          <View style={styles.actionIconContainer}>
            <Info size={20} color={Colors.primary} />
          </View>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>About</Text>
            <Text style={styles.actionDescription}>
              App version, legal information, and credits
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {Platform.OS === 'web' && (
        <View style={styles.webNotice}>
          <Shield size={16} color={Colors.lightText} />
          <Text style={styles.webNoticeText}>
            Some Bluetooth features are limited in web browsers for security reasons.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.lightText,
    marginTop: 4,
  },
  section: {
    marginTop: 24,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.lightText,
    marginHorizontal: 16,
    marginVertical: 8,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.lightText,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  actionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: Colors.lightText,
  },
  webNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}10`,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
  },
  webNoticeText: {
    fontSize: 14,
    color: Colors.lightText,
    marginLeft: 8,
    flex: 1,
  },
});
