import React,{ useState, useEffect } from "react";
import {View,Text} from "react-native";
import {useSelector } from 'react-redux';
import { getChat,messageInChatRoom} from "../../config/firebase";

import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import {
    Input,
    Icon,
    Button,
    NativeBaseProvider,
    Center,
    FlatList,
    Box,
    VStack,
    Pressable,
    AlertDialog
  } from "native-base";
 import { addMessage } from "../../config/firebase";
 
 import { GiftedChat } from 'react-native-gifted-chat'
 const db = getFirestore();

export default function Message({route,navigation})
{
    
  const [value,setValue] = useState();
  const [received,setReceived] = useState();
  const [sent,setSent] = useState();
  const [final,setFinal] = useState();
  
  const {item} = route.params;
  // const receiverid = item.id;
  const {id} = useSelector(state => state.userReducer.user);
  console.log(item);



 
  const message = async() =>{
  
    // await addMessage(value,id,receiverid,id);
    await messageInChatRoom(value,item.id,id)
     
  }
  const handle = (text) => {
    setValue(text);
    
    
  };
    useEffect(async() => {
       onSnapshot(
          doc(db, "chatroom",item.id),
          { includeMetadataChanges: true },
          (doc) => {
  
          // let s = doc.data();
          let {messages}=doc.data()
           messages.sort(function(x, y){
                    return x.timestamp - y.timestamp;
           })
          console.log("i am aranged",messages);
          setFinal(messages)
          }
          );
        // const data= await getChat(receiverid,id);
        // console.log('data' ,data)
        // if (data === true) {setReceived(data)};
       
        // const data2 = await getChat(id,receiverid);
        // console.log('data2' ,data2)
      
        // if (data2 === true)
        // { setSent(data2);}
        // setSent(data2);
        // onSnapshot(
        //   doc(db, "messages",receiverid+id),
        //   { includeMetadataChanges: true },
        //   (doc) => {
  
        //   let s = doc.data();
        //   setReceived(s);
        //   }
        //   );
      // const data= await getChat(receiverid,id);
      // if(data == true)
      // {
        //  onSnapshot(
        //   doc(db, "messages",id+receiverid),
        //   { includeMetadataChanges: true },
        //   (doc) => {
  
        //   let s = doc.data();
        //   setReceived(s);
        //   }
        //   );
        //   console.log(received)
      // }
      // else{
        // const data2 = await getChat(id,receiverid);
        // if(data2 == true)
        // {
      //      onSnapshot(
      //       doc(db, "messages",id+receiverid),
      //       { includeMetadataChanges: true },
      //       (doc) => {
    
      //       let s = doc.data();
      //       setReceived(s);
      //       }
      //       );
      // //   }
      //   console.log(received)
      // }
        

        
    // console.log(data);
    }, []);

    // useEffect(()=>{
    //         onSnapshot(
    //         doc(db, "messages",id+receiverid),
    //         { includeMetadataChanges: true },
    //         (doc) => {
    //           console.log("i am called",doc.data())
    //           let {messages}=doc.data()
    //           messages.sort(function(x, y){
    //             return x.timestamp - y.timestamp;
    //         })
    //         console.log("i am aranged",messages);
    //         setFinal(messages)
    //         }
    //         );
    // },[sent])
//     useEffect(()=>{
//      onSnapshot(
//       doc(db, "messages",receiverid+id),
//       { includeMetadataChanges: true },
//       (doc) => {
//         console.log("i am called 2",doc.data()) 
//         let {messages}=doc.data()
//         messages.sort(function(x, y){
//           return x.timestamp - y.timestamp;
//       })
//       console.log("i am aranged",messages);
//       setFinal(messages)
//       }
//       );

// },[received])

    return(
        <NativeBaseProvider>
        {final && (
          <FlatList
            data={final}
            renderItem={({ item }) => (
              <Pressable>
                {({ isHovered, isFocused, isPressed }) => {
                  return (
                    <Box
                      borderBottomWidth="1"
                      _dark={{
                        borderColor: "gray.600",
                      }}
                      borderColor="coolGray.200"
                      pl="4"
                      pr="5"
                      py="2"
                      ml={item["id"] === id ? "260":0}
                      bg="primary.400"
                      rounded="md"
                      width="50%"
                    >
                      <VStack>
                        <Text
                          _dark={{
                            color: "warmGray.50",
                          }}
                          color="coolGray.800"
                          bold
                        >
                          {item.text}
                        </Text>
                        <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                {console.log((item.timestamp).toDate())}
                {((item.timestamp).toDate()).toString()}
                </Text>
                       
                      </VStack>
                    </Box>
                  );
                }}
              </Pressable>
            )}
            keyExtractor={(item) => item.senderid}
            width="100%"
          />
        )}
       
        <Input
        size="xl"
        h="60px"
        mb="7"
        isFullWidth={true}
        onChangeText={handle}
        InputRightElement={
          <Button
            size="md"
            rounded="none"
            w="1/4"
            h="full"
            bg="black"
           
            onPress={message}
          >
            send
          </Button> 
        }
      
      />
    
      </NativeBaseProvider>
);
}

// <GiftedChat
// messages={final}
// onSend={message}
// user={{
//   _id: 1,
// }}/>

// onPress={() => {
//     pickupSelection(item);
//   }}

// onSnapshot(
//     doc(db, "messages",senderid+receiverid),
//     { includeMetadataChanges: true },
//     (doc) => {

//       console.log(doc.data());
 //setSent(doc.data(()));
//     }
//   );


// async function getChat(senderid,receiverid)
// {
//     const docRef = doc(db,"messages",senderid+receiverid);
//     const docSnap = await getDoc(docRef);
   
  
//       if (docSnap.exists()) {
//           const data = docSnap.data();
//           console.log(data);
//          return data;
         

//       } else {
         
//        console.log("No such document!");
//       }
   
// }

/*
{received && (
  <FlatList
    data={received.temparr}
    renderItem={({ item }) => (
      <Pressable
       onPress={() => {
       navigation.navigate('message',{item})
       }}
      >
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
              bg="error.600"
            >
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item}
                </Text>
               
              </VStack>
            </Box>
          );
        }}
      </Pressable>
    )}
    keyExtractor={(item) => item.senderid}
    width="50%"
  />
)}
{sent && (
  <FlatList
    data={sent.temparr}
    renderItem={({ item }) => (
      <Pressable
      >
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
              bg="primary.500"
            >
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item}
                </Text>
               
              </VStack>
            </Box>
          );
        }}
      </Pressable>
    )}
    keyExtractor={(item) => item.senderid}
    width="70%"
  />
)}

*/