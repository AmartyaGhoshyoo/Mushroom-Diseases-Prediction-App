import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Components
import Separator from './Separator';

// Constants
import {COLORS} from '../constants';

type TableProps = {
  header: TableRow;
  data: TableRow[] | [];
  backgroundColor?: string;
};

const Table = ({header, data, backgroundColor}: TableProps) => {
  return (
    <View
      style={[
        styles.tableContainer,
        {backgroundColor: backgroundColor || COLORS.primaryDark},
      ]}>
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>{header.name}</Text>
        <Text style={styles.tableHeader}>{header.value}</Text>
      </View>
      {data.map((item, index) => (
        <View key={index.toString()}>
          <Separator color={COLORS.gray2} />
          <View style={styles.tableRow}>
            <Text style={styles.tableData}>{item.name}</Text>
            <Text style={styles.tableData}>{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  tableContainer: {
    width: '95%',
    borderRadius: 4,
    paddingVertical: 6,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  tableData: {
    color: COLORS.lightWhite,
  },
});
