import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const HomePage = ({ navigation }) => {
  // State definitions
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [index, setIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedSpendingType, setSelectedSpendingType] = useState('');
  const [incomeCategories, setIncomeCategories] = useState([
    "Salary", "Rental Income", "Allowance", "Internship Income", "Scholarship Income", "Interest/Profit Share Income", "Additional Income"
  ]);
  const [spendingTypeCategories, setSpendingTypeCategories] = useState([
    "House Expenses", "Bills", "Financial Products", "Personal", "Health", "Transportation", "Entertainment"
  ]);
  const [expenseCategories, setExpenseCategories] = useState({
    "House Expenses": ["Rent", "Food/Grocery", "Household Items", "Property Tax", "Dues"],
    "Bills": ["TV Subscription", "Electricity", "Internet", "Water", "Heating", "Mobile Phone"],
    "Financial Products": ["Loan Installment", "Credit Card Debt", "Insurance Premiums"],
    "Personal": ["Gift", "Clothing/Shoes", "Accessory", "Hairdresser", "Makeup/Personal Items", "Education/Course"],
    "Health": ["Medicine/Vitamins", "Doctor/Hospital Expenses"],
    "Transportation": ["Public Transport", "Fuel Cost", "Vehicle Maintenance/Tax Costs"],
    "Entertainment": ["Vacation", "Cinema/Concert", "Hobby", "Newspaper/Magazine/Book", "Gym Membership", "Dining Out"]
  });
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [incomeRecords, setIncomeRecords] = useState([]);
  const [expenseRecords, setExpenseRecords] = useState([]);

  const handleSave = () => {
    const newRecord = {
      date: selectedDate,
      category: selectedCategory,
      amount: parseFloat(amount) || 0,
    };

    if (index === 0) {
      setIncomeRecords([...incomeRecords, newRecord]);
    } else {
      setExpenseRecords([...expenseRecords, newRecord]);
    }

    setSelectedDate('');
    setSelectedCategory('');
    setAmount('');
  };

  const currentBalanceCalculate = () => {
    const totalIncome = incomeRecords.reduce((total, record) => total + parseFloat(record.amount || 0), 0);
    const totalExpenses = expenseRecords.reduce((total, record) => total + parseFloat(record.amount || 0), 0);
    const currentBalance = totalIncome - totalExpenses;
    return currentBalance.toFixed(2); // Shows two decimal places
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date.toDateString());
    hideDatePicker();
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      if (index === 0) {
        setIncomeCategories([...incomeCategories, newCategory]);
      } else {
        const updatedCategories = { ...expenseCategories };
        if (!updatedCategories[selectedSpendingType]) {
          updatedCategories[selectedSpendingType] = [];
        }
        updatedCategories[selectedSpendingType].push(newCategory);
        setExpenseCategories(updatedCategories);
      }
      setNewCategory('');
      setShowModal(false);
    }
  };

  const handleSpendingTypeChange = (value) => {
    setSelectedSpendingType(value);
    setSelectedCategory('');
  };

  const categoryList = index === 0 ? incomeCategories : expenseCategories[selectedSpendingType] || [];

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <LinearGradient
          colors={['#3A1C71', '#D76D77', '#FFAF7B']}
          style={styles.Container}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.currentBalanceText}>Current Balance</Text>
          <Text style={styles.balanceAmountText}>{currentBalanceCalculate()} ₺</Text>
          <View style={styles.navigationContainer}>
            <TouchableOpacity style={styles.navigationButton}>
              <MaterialIcons name="navigate-before" size={50} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="navigate-next" size={50} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <SegmentedControlTab
          values={['Income', 'Expense']}
          selectedIndex={index}
          onTabPress={setIndex}
          tabsContainerStyle={styles.segmentedControl}
          tabTextStyle={styles.segmentedControlText}
          activeTabStyle={styles.segmentedControlActiveTab}
          activeTabTextStyle={styles.segmentedControlActiveText}
          tabStyle={styles.segmentedControlTab}
        />
        
        <ScrollView style={styles.scrollView}>
          <View style={styles.datePickerContainer}>
            <Button title="Show Date Picker" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Text style={styles.dateText}>{selectedDate}</Text>
          </View>

          {/* Income Form */}
          {index === 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>Category</Text>
              <View style={{ width: '100%' }}>
                <SelectList 
                  setSelected={setSelectedCategory} 
                  data={incomeCategories.map(cat => ({ key: cat, value: cat }))}
                  save="value"
                  placeholder="Select a category..."
                  searchPlaceholder="Search category..."
                  inputStyles={{ width: '100%' }}
                  dropdownStyles={{ width: '100%' }} 
                />
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
                <Text style={styles.addButtonText}>Add Category</Text>
              </TouchableOpacity>
              <View style={styles.section}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  placeholder="Enter amount..."
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  style={styles.input}
                  placeholderTextColor='grey'
                />
              </View>
            </View>
          )}

          {/* Expense Form */}
          {index === 1 && (
            <>
              <View style={styles.section}>
                <Text style={styles.label}>Spending Type</Text>
                <View style={{ width: '100%' }}>
                  <SelectList 
                    setSelected={handleSpendingTypeChange}
                    data={spendingTypeCategories.map(cat => ({ key: cat, value: cat }))}
                    save="value"
                    placeholder="Select spending type..."
                    searchPlaceholder="Search spending type..."
                    inputStyles={{ width: '100%' }}
                    dropdownStyles={{ width: '100%' }} 
                  />
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Category</Text>
                <View style={{ width: '100%' }}>
                  <SelectList 
                    setSelected={setSelectedCategory} 
                    data={categoryList.map(cat => ({ key: cat, value: cat }))}
                    save="value"
                    placeholder="Select a category..."
                    searchPlaceholder="Search category..."
                    inputStyles={{ width: '100%' }}
                    dropdownStyles={{ width: '100%' }} 
                  />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
                  <Text style={styles.addButtonText}>Add Category</Text>
                </TouchableOpacity>
                <View style={styles.section}>
                  <Text style={styles.label}>Amount</Text>
                  <TextInput
                    placeholder="Enter amount..."
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                    style={styles.input}
                    placeholderTextColor='grey'
                  />
                </View>
              </View>
            </>
          )}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Modal for adding new category */}
        <Modal
          visible={showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Enter new category..."
                value={newCategory}
                onChangeText={setNewCategory}
                style={styles.modalInput}
                placeholderTextColor='grey'
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={handleAddCategory}>
                  <Text style={styles.modalButtonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  currentBalanceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  balanceAmountText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  segmentedControl: {
    marginVertical: 10,
  },
  segmentedControlText: {
    fontSize: 20,
  },
  segmentedControlActiveTab: {
    backgroundColor: 'white',
  },
  segmentedControlActiveText: {
    color: 'black',
  },
  segmentedControlTab: {
    borderWidth: 1,
    borderColor: 'white',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  datePickerContainer: {
    marginVertical: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#3A1C71',
  },
  section: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    padding: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#3A1C71',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    marginVertical: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#3A1C71',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomePage;
