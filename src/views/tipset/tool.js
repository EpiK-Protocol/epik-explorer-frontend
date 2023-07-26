// export function getBlockCoord(tipsets,cids, i, id) {
//   // debugger
//   const ticketBlockIndex = cids.findIndex(item => {
//     if(item['/'] === id){
//       // debugger
//       console.log(item)
//     }
//     return item['/'] === id;
//   }); //ticket block index
//   if (tipsets[0] && tipsets[0].Messages['/']) {
//     const ticketBlock = tipsets.splice(ticketBlockIndex, 1);
//     tipsets.unshift(ticketBlock[0]); //put ticket block at first
//     return tipsets.map((item, index, arr) => {
//       return {
//         ...item,
//         coord: [Number(i), (index + 1) * 5],
//         blockCount: arr.length,
//         // cid: id
//       };
//     });
//   } else {
//     return [
//       {
//         coord: [Number(i), 10]
//       }
//     ];
//   } //null block
// }
export function getBlockCoord(tipsets, i, id) {
  // debugger
  const ticketBlockIndex = tipsets.findIndex(item => {
    return item.cid === id;
  }); //ticket block index
  if (tipsets[0] && tipsets[0].Messages['/']) {
    // const ticketBlock = tipsets.splice(ticketBlockIndex, 1);
    // tipsets.unshift(ticketBlock[0]); //put ticket block at first
    return tipsets.map((item, index, arr) => {
      return {
        ...item,
        coord: [Number(i), (index + 1) * 5],
        blockCount: arr.length,
        // cid: id
      };
    });
  } else {
    return [
      {
        coord: [Number(i), 10]
      }
    ];
  } //null block
}
