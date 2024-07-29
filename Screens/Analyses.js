import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import moment from 'moment'; // Tarih işlemleri için gerekli

const Analyses = ({ route }) => {
  // Parametreleri al
  const { gelir, gider, expenseRecords = [] } = route.params || { gelir: 0, gider: 0, expenseRecords: [] };

  // Kalan parayı hesapla
  const kalanPara = gelir - gider;

  // Kalan paranın tüm gelire oranını hesapla
  const oran = gelir > 0 ? (kalanPara / gelir * 100).toFixed(2) : 0;

  // Harcama türlerini gruplama ve toplamlarını hesaplama
  const spendingTypeTotals = expenseRecords.reduce((acc, record) => {
    if (!acc[record.category]) {
      acc[record.category] = 0;
    }
    acc[record.category] += record.amount;
    return acc;
  }, {});

  // Aylık Harcama Verilerini Hesaplama
  const monthlySpending = expenseRecords.reduce((acc, record) => {
    const month = moment(record.date).format('YYYY-MM');
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += record.amount;
    return acc;
  }, {});

  // Aylık Harcamalar için PieChart Verisi
  const monthlyPieChartData = Object.keys(monthlySpending).map(month => ({
    name: month,
    amount: monthlySpending[month],
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }));

  // Harcama Türleri için PieChart Verisi
  const pieChartData = Object.keys(spendingTypeTotals).map(type => ({
    name: type,
    amount: spendingTypeTotals[type],
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }));

  // Aylık Harcama Çubuk Grafiği Verisi
  const monthlyBarChartData = {
    labels: Object.keys(monthlySpending),
    datasets: [{
      data: Object.values(monthlySpending)
    }]
  };

  return (
    <ScrollView style={styles.ScrollContainer}>
      {/* Gelir ve Gider */}
      <View style={styles.container}>
        <Text style={styles.viewText}>Total Income:</Text>
        <Text style={styles.viewText}>{gelir.toFixed(2)} ₺</Text>
        <Text style={[styles.viewText,{marginTop:50}]}>Total Expenses:</Text>
        <Text style={styles.viewText}>{gider.toFixed(2)} ₺</Text>
      </View>

      {/* Kalan Para ve Oran */}
      <View style={styles.container}>
        <Text style={styles.viewText}>Net Balance:</Text>
        <Text style={styles.viewText}>{kalanPara.toFixed(2)} ₺</Text>
        <Text style={[styles.viewText,{marginTop:50}]}>Savings Rate:</Text>
        <Text style={styles.viewText}>{oran} %</Text>
      </View>

      {/* Harcama Türleri Pasta Grafiği */}
      <View style={styles.chartContainer}>
        <Text style={{color:'black', fontWeight:'bold', fontSize:20}}>Spending Type Chart:</Text>
        <PieChart
          data={pieChartData}
          width={320}
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fdfdfd",
            backgroundGradientTo: "#e26a00",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Aylık Harcama Çubuk Grafiği */}
      <View style={styles.chartContainer}>
        <Text style={{color:'black', fontWeight:'bold', fontSize:20}}>Monthly Spending Chart:</Text>
        <BarChart
          data={monthlyBarChartData}
          width={320}
          height={220}
          chartConfig={{
            backgroundColor: "red",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          fromZero={true}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    backgroundColor: '#3A1C71',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 12,
  },
  ScrollContainer: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  viewText: {
    color: 'white',
    fontSize: 25,
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 12,
  },
});

export default Analyses;
