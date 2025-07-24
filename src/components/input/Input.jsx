import { TextInput, View } from "react-native";

const Input = ({
  value,
  holder,
  onChange,
  Icon,
  keyboard,
  onlyRead = false,
}) => {
  return (
    <View className="flex flex-row bg-white items-center h-[60px] overflow-hidden rounded-lg shadow-md shadow-gray-300">
      <View className="w-14 flex flex-row items-center justify-center h-full">
        <Icon />
      </View>
      <TextInput
        readOnly={onlyRead}
        autoComplete="off"
        autoCapitalize="none"
        placeholder={holder}
        defaultValue={value}
        onChangeText={onChange}
        keyboardType={keyboard || "default"}
        maxLength={keyboard === "numeric" ? 10 : null}
        className="flex-1 bg-white outline-none px-1"
      />
    </View>
  );
};

export default Input;
