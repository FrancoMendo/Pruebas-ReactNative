// import React, { useState } from "react";
// import CircularPicker from "react-native-circular-picker";

// const CircularPickerLib = () => {
//   const [price, setPrice] = useState(0);
//   const handleChange = (v) => setPrice((v * 20).toFixed(0));

//   return (
//     <CicularPicker
//       size={400}
//       steps={[15, 40, 70, 100]}
//       gradients={{
//         0: ["rgb(255, 97, 99)", "rgb(247, 129, 119)"],
//         15: ["rgb(255, 204, 0)", "rgb(255, 214, 10)"],
//         40: ["rgb(52, 199, 89)", "rgb(48, 209, 88)"],
//         70: ["rgb(0, 122, 255)", "rgb(10, 132, 255)"],
//       }}
//       onChange={handleChange}
//     >
//       <>
//         <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 8 }}>
//           {price} $
//         </Text>
//         <Text style={{ textAlign: "center" }}>Available balance 2000 $</Text>
//       </>
//     </CicularPicker>
//   );
// };

// export default CircularPicker;
