const utilsGiantWalls = {
  demoRoomWalls: {
    [utils.asGridCoord(7, 6)]: true, // DYNAMIC key naming. Return value becomes key name
    [utils.asGridCoord(8, 6)]: true,
    [utils.asGridCoord(7, 7)]: true,
    [utils.asGridCoord(8, 7)]: true,
  },
  scp1: {
    [utils.asGridCoord(1, 3)]: true, // top room left
    [utils.asGridCoord(1, 4)]: true,
    [utils.asGridCoord(2, 2)]: true, // top room top
    [utils.asGridCoord(8, 1)]: true, // Block main door
    [utils.asGridCoord(25, 1)]: true, // Block SCP door
    [utils.asGridCoord(3, 2)]: true,
    [utils.asGridCoord(4, 2)]: true,
    [utils.asGridCoord(5, 2)]: true,
    [utils.asGridCoord(6, 2)]: true,
    [utils.asGridCoord(7, 2)]: true,
    [utils.asGridCoord(9, 2)]: true,
    [utils.asGridCoord(10, 2)]: true,
    [utils.asGridCoord(11, 2)]: true,
    [utils.asGridCoord(12, 2)]: true,
    [utils.asGridCoord(13, 2)]: true,
    [utils.asGridCoord(14, 2)]: true,
    [utils.asGridCoord(15, 3)]: true, // top room right
    [utils.asGridCoord(15, 4)]: true,
    [utils.asGridCoord(2, 5)]: true, // top room B left
    [utils.asGridCoord(3, 5)]: true,
    [utils.asGridCoord(4, 5)]: true,
    [utils.asGridCoord(5, 5)]: true,
    [utils.asGridCoord(6, 5)]: true,
    [utils.asGridCoord(7, 5)]: true,
    [utils.asGridCoord(9, 5)]: true, // top room B right
    [utils.asGridCoord(10, 5)]: true,
    [utils.asGridCoord(11, 5)]: true,
    [utils.asGridCoord(12, 5)]: true,
    [utils.asGridCoord(13, 5)]: true,
    [utils.asGridCoord(14, 5)]: true,
    [utils.asGridCoord(7, 6)]: true, // first Corridor left
    [utils.asGridCoord(7, 7)]: true,
    [utils.asGridCoord(7, 8)]: true,
    [utils.asGridCoord(7, 9)]: true,
    [utils.asGridCoord(6, 10)]: true,
    [utils.asGridCoord(6, 11)]: true,
    [utils.asGridCoord(6, 14)]: true,
    [utils.asGridCoord(6, 15)]: true,
    [utils.asGridCoord(6, 16)]: true,
    [utils.asGridCoord(6, 17)]: true,
    [utils.asGridCoord(6, 18)]: true,
    [utils.asGridCoord(6, 19)]: true,
    [utils.asGridCoord(6, 20)]: true,
    [utils.asGridCoord(6, 21)]: true,
    [utils.asGridCoord(6, 22)]: true,
    [utils.asGridCoord(6, 23)]: true,
    [utils.asGridCoord(6, 12)]: true, // first Room Top
    [utils.asGridCoord(5, 12)]: true,
    [utils.asGridCoord(4, 12)]: true,
    [utils.asGridCoord(3, 12)]: true,
    [utils.asGridCoord(2, 12)]: true,
    [utils.asGridCoord(1, 13)]: true, // first Room Left
    [utils.asGridCoord(1, 14)]: true,
    [utils.asGridCoord(1, 15)]: true,
    [utils.asGridCoord(1, 16)]: true,
    [utils.asGridCoord(1, 17)]: true,
    [utils.asGridCoord(1, 18)]: true,
    [utils.asGridCoord(1, 19)]: true,
    [utils.asGridCoord(2, 20)]: true, // first Room Bottom
    [utils.asGridCoord(3, 20)]: true,
    [utils.asGridCoord(4, 20)]: true,
    [utils.asGridCoord(5, 20)]: true,
    [utils.asGridCoord(9, 6)]: true, // first Corridor Right
    [utils.asGridCoord(9, 7)]: true,
    [utils.asGridCoord(9, 8)]: true,
    [utils.asGridCoord(9, 9)]: true,
    [utils.asGridCoord(9, 10)]: true,
    [utils.asGridCoord(9, 11)]: true,
    [utils.asGridCoord(9, 12)]: true,
    [utils.asGridCoord(9, 13)]: true,
    [utils.asGridCoord(9, 14)]: true,
    [utils.asGridCoord(9, 15)]: true,
    [utils.asGridCoord(9, 16)]: true,
    [utils.asGridCoord(9, 17)]: true,
    [utils.asGridCoord(9, 18)]: true,
    [utils.asGridCoord(9, 19)]: true,
    [utils.asGridCoord(9, 20)]: true,
    [utils.asGridCoord(9, 21)]: true, // Second Corridor Top
    [utils.asGridCoord(10, 21)]: true,
    [utils.asGridCoord(11, 21)]: true,
    [utils.asGridCoord(12, 21)]: true,
    [utils.asGridCoord(13, 21)]: true,
    [utils.asGridCoord(15, 21)]: true,
    [utils.asGridCoord(16, 21)]: true,
    [utils.asGridCoord(17, 21)]: true,
    [utils.asGridCoord(18, 21)]: true,
    [utils.asGridCoord(7, 24)]: true, // Second Corridor Bottom
    [utils.asGridCoord(8, 24)]: true,
    [utils.asGridCoord(9, 24)]: true,
    [utils.asGridCoord(10, 24)]: true,
    [utils.asGridCoord(11, 24)]: true,
    [utils.asGridCoord(12, 24)]: true,
    [utils.asGridCoord(13, 24)]: true,
    [utils.asGridCoord(14, 24)]: true,
    [utils.asGridCoord(15, 24)]: true,
    [utils.asGridCoord(16, 24)]: true,
    [utils.asGridCoord(17, 24)]: true,
    [utils.asGridCoord(18, 24)]: true,
    [utils.asGridCoord(13, 17)]: true, // Second Room Left
    [utils.asGridCoord(13, 18)]: true,
    [utils.asGridCoord(13, 19)]: true,
    [utils.asGridCoord(13, 20)]: true,
    [utils.asGridCoord(12, 17)]: true,
    [utils.asGridCoord(11, 10)]: true,
    [utils.asGridCoord(11, 11)]: true,
    [utils.asGridCoord(11, 12)]: true,
    [utils.asGridCoord(11, 13)]: true,
    [utils.asGridCoord(11, 14)]: true,
    [utils.asGridCoord(11, 15)]: true,
    [utils.asGridCoord(11, 16)]: true,
    [utils.asGridCoord(12, 9)]: true, // Second Room Top
    [utils.asGridCoord(13, 9)]: true,
    [utils.asGridCoord(14, 9)]: true,
    [utils.asGridCoord(15, 9)]: true,
    [utils.asGridCoord(16, 9)]: true,
    [utils.asGridCoord(17, 9)]: true,
    [utils.asGridCoord(18, 9)]: true,
    [utils.asGridCoord(19, 10)]: true, // Second Room Right
    [utils.asGridCoord(19, 11)]: true,
    [utils.asGridCoord(19, 12)]: true,
    [utils.asGridCoord(19, 13)]: true,
    [utils.asGridCoord(19, 14)]: true,
    [utils.asGridCoord(19, 15)]: true,
    [utils.asGridCoord(19, 16)]: true,
    [utils.asGridCoord(18, 17)]: true, // Second Room Bottom
    [utils.asGridCoord(17, 17)]: true,
    [utils.asGridCoord(16, 17)]: true,
    [utils.asGridCoord(15, 11)]: true, // Second Room Col
    [utils.asGridCoord(15, 12)]: true,
    [utils.asGridCoord(15, 13)]: true,
    [utils.asGridCoord(15, 14)]: true,
    [utils.asGridCoord(15, 15)]: true,
    [utils.asGridCoord(15, 16)]: true,
    [utils.asGridCoord(15, 17)]: true,
    [utils.asGridCoord(15, 18)]: true,
    [utils.asGridCoord(15, 19)]: true,
    [utils.asGridCoord(15, 20)]: true,
    [utils.asGridCoord(18, 25)]: true, // Col Room Left
    [utils.asGridCoord(18, 26)]: true,
    [utils.asGridCoord(18, 27)]: true,
    [utils.asGridCoord(18, 28)]: true,
    [utils.asGridCoord(18, 29)]: true,
    [utils.asGridCoord(18, 30)]: true,
    [utils.asGridCoord(20, 26)]: true, // Col Room Top
    [utils.asGridCoord(20, 24)]: true,
    [utils.asGridCoord(20, 25)]: true,
    [utils.asGridCoord(21, 26)]: true,
    [utils.asGridCoord(22, 26)]: true,
    [utils.asGridCoord(23, 26)]: true,
    [utils.asGridCoord(24, 26)]: true,
    [utils.asGridCoord(25, 26)]: true,
    [utils.asGridCoord(26, 26)]: true,
    [utils.asGridCoord(27, 26)]: true,
    [utils.asGridCoord(28, 26)]: true,
    [utils.asGridCoord(29, 26)]: true,
    [utils.asGridCoord(30, 26)]: true,
    [utils.asGridCoord(31, 26)]: true,
    [utils.asGridCoord(32, 26)]: true,
    [utils.asGridCoord(33, 27)]: true, // Col Room Right
    [utils.asGridCoord(33, 28)]: true,
    [utils.asGridCoord(33, 29)]: true,
    [utils.asGridCoord(33, 30)]: true,
    [utils.asGridCoord(19, 31)]: true, // Col Room Bottom
    [utils.asGridCoord(20, 31)]: true,
    [utils.asGridCoord(21, 31)]: true,
    [utils.asGridCoord(22, 31)]: true,
    [utils.asGridCoord(23, 31)]: true,
    [utils.asGridCoord(24, 31)]: true,
    [utils.asGridCoord(25, 31)]: true,
    [utils.asGridCoord(26, 31)]: true,
    [utils.asGridCoord(27, 31)]: true,
    [utils.asGridCoord(28, 31)]: true,
    [utils.asGridCoord(29, 31)]: true,
    [utils.asGridCoord(30, 31)]: true,
    [utils.asGridCoord(31, 31)]: true,
    [utils.asGridCoord(32, 31)]: true,
    // Col Room col top
    // [utils.asGridCoord(21, 28)]: true,
    // [utils.asGridCoord(22, 28)]: true,
    // [utils.asGridCoord(23, 28)]: true,
    // [utils.asGridCoord(24, 28)]: true,
    // [utils.asGridCoord(25, 28)]: true,
    // [utils.asGridCoord(26, 28)]: true,
    // [utils.asGridCoord(27, 28)]: true,
    // [utils.asGridCoord(28, 28)]: true,
    // [utils.asGridCoord(29, 28)]: true,
    // [utils.asGridCoord(30, 28)]: true,

    // Col Room col bottom
    [utils.asGridCoord(21, 29)]: true,
    [utils.asGridCoord(22, 29)]: true,
    [utils.asGridCoord(23, 29)]: true,
    [utils.asGridCoord(24, 29)]: true,
    [utils.asGridCoord(25, 29)]: true,
    [utils.asGridCoord(26, 29)]: true,
    [utils.asGridCoord(27, 29)]: true,
    [utils.asGridCoord(28, 29)]: true,
    [utils.asGridCoord(29, 29)]: true,
    [utils.asGridCoord(30, 29)]: true,
    [utils.asGridCoord(20, 23)]: true, // Third Corridor A Right
    [utils.asGridCoord(20, 22)]: true,
    [utils.asGridCoord(20, 21)]: true,
    [utils.asGridCoord(18, 20)]: true, // Third Corridor A Top
    [utils.asGridCoord(18, 19)]: true,
    [utils.asGridCoord(19, 18)]: true,
    [utils.asGridCoord(20, 18)]: true,
    [utils.asGridCoord(21, 18)]: true,
    [utils.asGridCoord(22, 18)]: true,
    [utils.asGridCoord(23, 18)]: true,
    [utils.asGridCoord(24, 18)]: true,
    [utils.asGridCoord(25, 18)]: true,
    [utils.asGridCoord(26, 18)]: true,
    [utils.asGridCoord(21, 21)]: true, // Third Corridor A Bottom
    [utils.asGridCoord(22, 21)]: true,
    [utils.asGridCoord(23, 21)]: true,
    [utils.asGridCoord(24, 21)]: true,
    [utils.asGridCoord(25, 21)]: true,
    [utils.asGridCoord(26, 21)]: true,
    [utils.asGridCoord(27, 21)]: true,
    [utils.asGridCoord(28, 21)]: true,
    [utils.asGridCoord(29, 18)]: true, // Third Corridor A COL
    [utils.asGridCoord(29, 19)]: true,
    [utils.asGridCoord(29, 20)]: true,
    [utils.asGridCoord(29, 21)]: true,
    [utils.asGridCoord(29, 22)]: true,
    [utils.asGridCoord(26, 17)]: true, // Third Corridor C left
    [utils.asGridCoord(26, 16)]: true,
    [utils.asGridCoord(26, 15)]: true,
    [utils.asGridCoord(27, 15)]: true, // Third Corridor C Top
    [utils.asGridCoord(28, 15)]: true,
    [utils.asGridCoord(29, 15)]: true,
    [utils.asGridCoord(30, 15)]: true,
    [utils.asGridCoord(31, 16)]: true, // Third Corridor C Right
    [utils.asGridCoord(31, 17)]: true,
    [utils.asGridCoord(31, 18)]: true,
    [utils.asGridCoord(31, 19)]: true,
    [utils.asGridCoord(31, 20)]: true,
    [utils.asGridCoord(31, 21)]: true,
    [utils.asGridCoord(31, 22)]: true,
    [utils.asGridCoord(21, 22)]: true, // Third Corridor B Top
    [utils.asGridCoord(22, 22)]: true,
    [utils.asGridCoord(23, 22)]: true,
    [utils.asGridCoord(24, 22)]: true,
    [utils.asGridCoord(25, 22)]: true,
    [utils.asGridCoord(26, 22)]: true,
    [utils.asGridCoord(27, 22)]: true,
    [utils.asGridCoord(28, 22)]: true,
    [utils.asGridCoord(21, 25)]: true, // Third Corridor B Bottom
    [utils.asGridCoord(22, 25)]: true,
    [utils.asGridCoord(23, 25)]: true,
    [utils.asGridCoord(24, 25)]: true,
    [utils.asGridCoord(25, 25)]: true,
    [utils.asGridCoord(26, 25)]: true,
    [utils.asGridCoord(27, 25)]: true,
    [utils.asGridCoord(28, 25)]: true,
    [utils.asGridCoord(29, 25)]: true,
    [utils.asGridCoord(30, 25)]: true,
    [utils.asGridCoord(31, 25)]: true,
    [utils.asGridCoord(32, 25)]: true,
    [utils.asGridCoord(33, 25)]: true,
    [utils.asGridCoord(34, 25)]: true,
    [utils.asGridCoord(35, 12)]: true, // Fourth Corridor Right
    [utils.asGridCoord(35, 13)]: true,
    [utils.asGridCoord(35, 14)]: true,
    [utils.asGridCoord(35, 15)]: true,
    [utils.asGridCoord(35, 16)]: true,
    [utils.asGridCoord(35, 17)]: true,
    [utils.asGridCoord(35, 18)]: true,
    [utils.asGridCoord(35, 19)]: true,
    [utils.asGridCoord(35, 20)]: true,
    [utils.asGridCoord(35, 21)]: true,
    [utils.asGridCoord(35, 22)]: true,
    [utils.asGridCoord(35, 23)]: true,
    [utils.asGridCoord(35, 24)]: true,
    [utils.asGridCoord(32, 15)]: true, // Fourth Corridor Left
    [utils.asGridCoord(32, 14)]: true,
    [utils.asGridCoord(32, 12)]: true,
    [utils.asGridCoord(32, 11)]: true,
    [utils.asGridCoord(32, 10)]: true,
    [utils.asGridCoord(33, 9)]: true, // Fourth Corridor Top
    [utils.asGridCoord(34, 9)]: true,
    [utils.asGridCoord(35, 9)]: true,
    [utils.asGridCoord(36, 9)]: true,
    [utils.asGridCoord(37, 9)]: true,
    [utils.asGridCoord(36, 18)]: true, // Third Room Bttom
    [utils.asGridCoord(37, 18)]: true,
    [utils.asGridCoord(38, 9)]: true, // Third Room Right
    [utils.asGridCoord(38, 10)]: true,
    [utils.asGridCoord(38, 11)]: true,
    [utils.asGridCoord(38, 12)]: true,
    [utils.asGridCoord(38, 13)]: true,
    [utils.asGridCoord(38, 14)]: true,
    [utils.asGridCoord(38, 15)]: true,
    [utils.asGridCoord(38, 16)]: true,
    [utils.asGridCoord(38, 17)]: true,
    [utils.asGridCoord(26, 12)]: true, // Fifth Corr Top
    [utils.asGridCoord(27, 12)]: true,
    [utils.asGridCoord(28, 12)]: true,
    [utils.asGridCoord(29, 12)]: true,
    [utils.asGridCoord(30, 12)]: true,
    [utils.asGridCoord(31, 12)]: true,
    [utils.asGridCoord(32, 12)]: true,
    [utils.asGridCoord(26, 14)]: true, // Fifth Corr Bottom
    [utils.asGridCoord(27, 14)]: true,
    [utils.asGridCoord(28, 14)]: true,
    [utils.asGridCoord(29, 14)]: true,
    [utils.asGridCoord(30, 14)]: true,
    [utils.asGridCoord(31, 14)]: true,
    [utils.asGridCoord(32, 14)]: true,
    [utils.asGridCoord(22, 15)]: true, // Dead end Top
    [utils.asGridCoord(21, 16)]: true,
    [utils.asGridCoord(23, 15)]: true,
    [utils.asGridCoord(24, 15)]: true,
    [utils.asGridCoord(22, 17)]: true, // Dead end Bottom
    [utils.asGridCoord(23, 17)]: true,
    [utils.asGridCoord(24, 17)]: true,
    [utils.asGridCoord(25, 17)]: true,
    [utils.asGridCoord(24, 14)]: true, // Final Corri Left
    [utils.asGridCoord(24, 13)]: true,
    [utils.asGridCoord(24, 12)]: true,
    [utils.asGridCoord(24, 11)]: true,
    [utils.asGridCoord(24, 10)]: true,
    [utils.asGridCoord(24, 9)]: true,
    [utils.asGridCoord(24, 8)]: true,
    [utils.asGridCoord(24, 7)]: true,
    [utils.asGridCoord(24, 6)]: true,
    [utils.asGridCoord(24, 5)]: true,
    [utils.asGridCoord(26, 12)]: true, // Final Corri Right
    [utils.asGridCoord(26, 11)]: true,
    [utils.asGridCoord(26, 10)]: true,
    [utils.asGridCoord(26, 9)]: true,
    [utils.asGridCoord(26, 8)]: true,
    [utils.asGridCoord(26, 7)]: true,
    [utils.asGridCoord(26, 6)]: true,
    [utils.asGridCoord(26, 5)]: true,
    [utils.asGridCoord(19, 2)]: true, // Kill Room Top
    [utils.asGridCoord(20, 2)]: true,
    [utils.asGridCoord(21, 2)]: true,
    [utils.asGridCoord(22, 2)]: true,
    [utils.asGridCoord(23, 2)]: true,
    [utils.asGridCoord(24, 2)]: true,
    [utils.asGridCoord(26, 2)]: true,
    [utils.asGridCoord(27, 2)]: true,
    [utils.asGridCoord(28, 2)]: true,
    [utils.asGridCoord(29, 2)]: true,
    [utils.asGridCoord(30, 2)]: true,
    [utils.asGridCoord(31, 2)]: true,
    [utils.asGridCoord(19, 5)]: true, // Kill Room Bottom
    [utils.asGridCoord(20, 5)]: true,
    [utils.asGridCoord(21, 5)]: true,
    [utils.asGridCoord(22, 5)]: true,
    [utils.asGridCoord(23, 5)]: true,
    [utils.asGridCoord(24, 5)]: true,
    [utils.asGridCoord(26, 5)]: true,
    [utils.asGridCoord(27, 5)]: true,
    [utils.asGridCoord(28, 5)]: true,
    [utils.asGridCoord(29, 5)]: true,
    [utils.asGridCoord(30, 5)]: true,
    [utils.asGridCoord(31, 5)]: true,
    [utils.asGridCoord(18, 3)]: true, // Kill Room left
    [utils.asGridCoord(18, 4)]: true,
    [utils.asGridCoord(32, 3)]: true, // Kill Room Right
    [utils.asGridCoord(32, 4)]: true,
    [utils.asGridCoord(3, 17)]: true, // Furniture, fix later to class
    [utils.asGridCoord(3, 18)]: true,
    [utils.asGridCoord(17, 15)]: true,
    [utils.asGridCoord(32, 28)]: true,
    [utils.asGridCoord(32, 30)]: true,
    [utils.asGridCoord(33, 10)]: true,
  },
};
