import React, {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import colors from '../../../constants/colors';
import {Picker} from '@react-native-picker/picker';
import {commonInput} from '../../../constants/styles';
import {useSelector} from 'react-redux';

function SparePartItem({
  item,
  index,
  handleRemoveSparePart,
  handleUpdateSparePart,
}) {
  const {spareparts} = useSelector(state => state.spareparts);
  const [model, setModel] = useState(item.model);
  const [name, setName] = useState(item.name);

  const [modelsList, setModelsList] = useState([]);
  const [modelsListObjs, setModelsListObjs] = useState([]);
  const [sparePList, setSparePList] = useState([]);

  useEffect(() => {
    const sorted = [];
    const sorted2 = [];
    for (let i = 0; i < spareparts.length; i++) {
      if (!sorted.includes(spareparts[i].model.toLowerCase())) {
        sorted.push(spareparts[i].model.toLowerCase());
        sorted2.push({name: spareparts[i].model, id: spareparts[i].model});
      }
    }
    setModelsList(sorted);
    setModelsListObjs(sorted2);
  }, [spareparts]);

  useEffect(() => {
    setSparePList(
      spareparts.filter(
        item => item.model.toLowerCase() == model.toLowerCase(),
      ),
    );
  }, [model]);

  return (
    <View
      style={{
        marginVertical: 15,
        backgroundColor: colors.GAINSBORO,
        padding: 10,
        borderRadius: 10,
      }}>
      <Picker
        selectedValue={model}
        onValueChange={(itemValue, itemIndex) => setModel(itemValue)}
        style={{...commonInput}}>
        {[{name: 'Choose model', id: ''}, ...modelsListObjs].map((model, i) => (
          <Picker.Item key={i} label={model.name} value={model.id} />
        ))}
      </Picker>

      <Picker
        selectedValue={name}
        onValueChange={(itemValue, itemIndex) => {
          setName(itemValue);
          handleUpdateSparePart(index, {
            model: model,
            name: itemValue,
            _id: itemValue,
          });
        }}
        style={{...commonInput}}>
        {[{name: 'Choose Spare part', _id: ''}, ...sparePList].map(
          (model, i) => (
            <Picker.Item key={i} label={model.name} value={model._id} />
          ),
        )}
      </Picker>

      <Pressable onPress={() => handleRemoveSparePart(index)}>
        <Text style={{color: colors.RED, textAlign: 'right', marginTop: 5}}>
          Remove item
        </Text>
      </Pressable>
    </View>
  );
}

export default SparePartItem;
