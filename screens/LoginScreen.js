import * as React from 'react';
import { Text, Image } from 'react-native';

import { Container, Header, Left, Body, Button, Icon, Title, Content, Form, Item, Input, Label, View, Thumbnail } from 'native-base';

import pic from './pic';

const LoginScreen = ({ navigation }) => {
  //const uri = "https://drive.google.com/drive/u/1/folders/1JUopWeg_Z2bY5Dum6fYhpgKT8W_ZRsd4";
  return (
    <View style={{ flex: 1 }}>

      {/* <Thumbnail source={<pic/>} /> */}
      <Form>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input />
        </Item>
        <Item floatingLabel last>
          <Label>Password</Label>
          <Input />
        </Item>
        <Button block info
          style={{ margin: 15, alignContent: 'center' }}>
          <Text>SIGN IN</Text>
        </Button>
        <Button transparent danger
          style={{ marginVertical: 15, alignContent: 'center' }}
          onPress={() => navigation.navigate('Register')}
          title="Register"
        >
          <Text>SIGN UP</Text>
        </Button>
      </Form>
    </View>

    // <Container>
    //     <Header>
    //         <Content>
    //             <Form>
    //                 <Item floatingLabel>
    //                     <Label>Username</Label>
    //                     <Input />
    //                 </Item>
    //                 <Item floatingLabel last>
    //                     <Label>Password</Label>
    //                     <Input />
    //                 </Item>
    //                 <Button block info>
    //                     <Text>SIGN IN</Text>
    //                 </Button>
    //                 <Button transparent danger>
    //                     <Text>SIGN UP</Text>
    //                 </Button>
    //             </Form>
    //         </Content>
    //     </Header>

    // </Container>
  );

  // --- Native Base V3 ---
  // return <Center w="100%">
  //     <Box safeArea p="2" py="8" w="90%" maxW="290">
  //       <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
  //           color: "warmGray.50"
  //       }}>
  //       </Heading>

  //       <Heading mt="1" _dark={{
  //           color: "warmGray.200" }} 
  //           color="coolGray.600" fontWeight="medium" size="xs">
  //       </Heading>

  //       <VStack space={3} mt="5">
  //         <FormControl>
  //           <FormControl.Label>Username</FormControl.Label>
  //           <Input />
  //         </FormControl>
  //         <FormControl>
  //           <FormControl.Label>Password</FormControl.Label>
  //           <Input type="password" />
  //           <Link _text={{
  //               fontSize: "xs",
  //               fontWeight: "500",
  //               color: "indigo.500"
  //           }} alignSelf="flex-end" mt="1">
  //             Forget Password?
  //           </Link>
  //         </FormControl>
  //         <Button mt="2" colorScheme="indigo">
  //           Sign in
  //         </Button>
  //         <HStack mt="6" justifyContent="center">
  //           <Text fontSize="sm" color="coolGray.600" _dark={{
  //           color: "warmGray.200"
  //         }}>
  //             {" "}
  //           </Text>
  //           <Link _text={{
  //           color: "indigo.500",
  //           fontWeight: "medium",
  //           fontSize: "sm"
  //         }} href="#">
  //             Sign Up
  //           </Link>
  //         </HStack>
  //       </VStack>
  //     </Box>
  //   </Center>;
};

export default LoginScreen

// export default () => {
//   return (
//     <NativeBaseProvider>
//       <Center flex={1} px="3">
//           <LoginScreen />
//       </Center>
//     </NativeBaseProvider>
//   );
// };
