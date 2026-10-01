import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FORM_CONFIG } from '../config';
import { styles } from '../styles';

export default function SectionConstruction({ data, updateField }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>A — Construction</Text>

      <Text style={styles.label}>Contractor Mobilised Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2026-10-01"
        value={data.contractorMobilised}
        onChangeText={(txt) => updateField('contractorMobilised', txt)}
      />

      <Text style={styles.label}>Solar Foundation Start Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2026-10-02"
        value={data.foundationStart}
        onChangeText={(txt) => updateField('foundationStart', txt)}
      />

      <Text style={styles.label}>Solar Foundation End Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2026-10-05"
        value={data.foundationEnd}
        onChangeText={(txt) => updateField('foundationEnd', txt)}
      />

      <Text style={styles.label}>Earthing Works</Text>
      <View style={styles.row}>
        {['No', 'Yes'].map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.pill, data.earthingWorks === opt && styles.pillActive]}
            onPress={() => updateField('earthingWorks', opt)}
          >
            <Text style={data.earthingWorks === opt ? styles.pillTextActive : styles.pillText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {data.earthingWorks === 'Yes' && (
        <View style={styles.subBox}>
          <Text style={styles.label}>Type of Earthing</Text>
          <View style={styles.row}>
            {FORM_CONFIG.earthingTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.pill, data.earthingType === type && styles.pillActive]}
                onPress={() => updateField('earthingType', type)}
              >
                <Text style={data.earthingType === type ? styles.pillTextActive : styles.pillText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Earthing Nos</Text>
          <View style={styles.row}>
            {FORM_CONFIG.earthingCounts.map((num) => (
              <TouchableOpacity
                key={num}
                style={[styles.pill, data.earthingCount === num && styles.pillActive]}
                onPress={() => updateField('earthingCount', num)}
              >
                <Text style={data.earthingCount === num ? styles.pillTextActive : styles.pillText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}