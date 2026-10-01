import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FORM_CONFIG } from '../config';
import { styles } from '../styles';

export default function SectionUtility({ data, updateField, updateEssUnit, pvCapacity }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>B — Utility Installation</Text>

      <Text style={styles.label}>ESS</Text>
      <View style={styles.row}>
        {['No', 'Yes'].map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.pill, data.essWorks === opt && styles.pillActive]}
            onPress={() => updateField('essWorks', opt)}
          >
            <Text style={data.essWorks === opt ? styles.pillTextActive : styles.pillText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {data.essWorks === 'Yes' && (
        <View style={styles.subBox}>
          <Text style={styles.label}>No of ESS Installed</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {FORM_CONFIG.essCounts.map((num) => (
              <TouchableOpacity
                key={num}
                style={[styles.pill, data.essCount === num && styles.pillActive]}
                onPress={() => updateField('essCount', num)}
              >
                <Text style={data.essCount === num ? styles.pillTextActive : styles.pillText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {Array.from({ length: parseInt(data.essCount) || 1 }).map((_, index) => (
            <View key={index} style={styles.unitCard}>
              <Text style={styles.unitHeader}>ESS Unit #{index + 1}</Text>
              <Text style={styles.label}>Make</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Tesla / Huawei"
                value={data.essUnits?.[index]?.make || ''}
                onChangeText={(txt) => updateEssUnit(index, 'make', txt)}
              />
              <Text style={styles.label}>Serial No</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. SN-883921"
                value={data.essUnits?.[index]?.serial || ''}
                onChangeText={(txt) => updateEssUnit(index, 'serial', txt)}
              />
            </View>
          ))}
        </View>
      )}

      <Text style={styles.label}>Panel Capacity (W)</Text>
      <View style={styles.row}>
        {FORM_CONFIG.panelCapacities.map((cap) => (
          <TouchableOpacity
            key={cap}
            style={[styles.pill, data.panelCapacity === cap && styles.pillActive]}
            onPress={() => updateField('panelCapacity', cap)}
          >
            <Text style={data.panelCapacity === cap ? styles.pillTextActive : styles.pillText}>{cap}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Number of Solar Panels</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="e.g. 100"
        value={data.panelCount}
        onChangeText={(txt) => updateField('panelCount', txt)}
      />

      <Text style={styles.label}>Solar PV Capacity (kW) [Computed]</Text>
      <View style={styles.readOnlyBox}>
        <Text style={styles.readOnlyText}>{pvCapacity} kW</Text>
      </View>
    </View>
  );
}