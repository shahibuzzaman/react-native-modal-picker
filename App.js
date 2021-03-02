import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import ModalPicker from './components/ModalPicker';

const App = () => {
  const [options, setOptions] = useState('Select Item...');
  const [categories, setCategories] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const setData = (item) => {
    setOptions(item.notice_category);
    console.log('cat-id', item.id);
  };

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  };

  const api = 'http://noticeboard.clonestudiobd.com/api/noticecategories';

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((json) => setCategories(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => changeModalVisibility(true)}>
        <Text style={styles.text}>{options}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisibility(false)}>
        <ModalPicker
          changeModalVisibility={changeModalVisibility}
          setData={setData}
          categories={categories}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    marginVertical: 20,
    fontSize: 20,
  },

  touchableOpacity: {
    backgroundColor: 'orange',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
});
