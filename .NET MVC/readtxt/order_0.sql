INSERT INTO [orders] ([rosn],[userId],[orderstate],[productamount],[orderamount],[surplusmoney],[isreview],[addtime],[shipsn],[shipsystemname],[shipfriendname],[shiptime],[paymode],[sn],[paysystemname],[payfriendname],[paytime],[regionid],[consignee],[mobile],[phone],[email],[zipcode],[address],[besttime],[shipfee],[fullcut],[discount],[paycreditcount],[paycreditmoney],[couponmoney],[weight],[buyerremark],[ip]) VALUES ('3213213123245445','342343223','1','150.00','150.00','150.00','0','2019/11/5 7:37:36','','sto','顺丰快递','1900-01-01 00:00:00.000','10','','wechatpay','微信支付','','0','342343223','','','','000000','','2019/11/5 7:37:36','0.00','0','0.00','0','0.00','0','0','{"deviceId":"EREUIUI3943894389KJKJFKSL334343DFDFD","deviceName":"","channelId":"0","cloudUserName":""}','172.29.172.148')
INSERT INTO [orderproducts] ([oid],[userId],[sid],[pid],[psn],[cateid],[brandid],[name],[showimg],[discountprice],[shopprice],[costprice],[marketprice],[weight],[isreview],[realcount],[buycount],[sendcount],[type],[paycredits],[coupontypeid],[extcode1],[extcode2],[extcode3],[extcode4],[extcode5],[addtime]) VALUES(SCOPE_IDENTITY(), '12', '', '64', 'sn00000000009', '13', '26', '套餐9', '', '280', '280', '0.02', '280', 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019/11/5 7:37:36')
if (select COUNT([userId]) from users where username = '342343223') > 0
begin
update orders set[userId] = (select top 1 [userId] from users where username = '342343223') where rosn = '3213213123245445';
update orderproducts set [userId] = (select top 1 [userId] from orders where rosn = '3213213123245445') where oid = (select top 1 oid from orders where rosn = '3213213123245445');
end
else
begin
INSERT INTO [users] ([username],[email],[mobile],[password],[userrid],[admingid],[nickname],[avatar],[paycredits],[rankcredits],[verifyemail],[verifymobile],[liftbantime],[salt]) VALUES ('342343223', '', '', '', 7, 1, '','' ,2, 2, 0,0, '1900-01-01 00:00:00.000', '123456')
update orders set [userId] = SCOPE_IDENTITY() where rosn = '3213213123245445';
update orderproducts set [userId] = SCOPE_IDENTITY() where oid = (select top 1 oid from orders where rosn = '3213213123245445');
end


