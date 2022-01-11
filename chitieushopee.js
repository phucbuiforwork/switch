var tongDonHang = 0;
var tongTienDuocGiamMggShopee=0;
var tongTienDuocGiamMggShopeeShop=0;
var tongTienChiTieu = 0;
var tongTienTietKiem=0;
var tongTienHang = 0;
var tongTienVanChuyenChuaGiam = 0;
var tongTienVanChuyenDuocGiam = 0;
var tongSanPhamDaMua = 0;
var trangThaiDonHangConKhong = true;
var coin_earn = 0;
var offset = 0;
var si = 8;
var tongTienVanChuyenPhaiTra=0;
function xemBaoCaoThongKe() {
	var orders = [];
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			orders = JSON.parse(this.responseText)['orders'];
			tongDonHang += orders.length;
			trangThaiDonHangConKhong = orders.length >= si;
			orders.forEach(order => {
                let t3 = order["shipping_discount_subtotal"] / 100000;
                tongTienVanChuyenDuocGiam += t3;
                let t31 = order["shipping_subtotal_before_discount"] / 100000;
                tongTienVanChuyenChuaGiam += t31;
                let t4=order["merchandise_subtotal"] / 100000;
				tongTienHang+=t4;
				let t41=order["actual_price"] / 100000;
				tongTienChiTieu+=t41;
				let t2 = order["shipping_fee"] / 100000;
                tongTienVanChuyenPhaiTra += t2;
                order["items"].forEach(item => {
                    let t5 = item["amount"];
                    tongSanPhamDaMua += t5;
                });
                let t6=(order["payment_info"]["voucher_info"]["discount_by_shop_voucher"]||0)/100000;
                tongTienDuocGiamMggShopeeShop += t6;
                let t61=(order["payment_info"]["promotion_info"]["used_price"]||0)/100000;
                tongTienDuocGiamMggShopeeShop += t61;

                let t7=(order["payment_info"]["voucher_info"]["discount_by_shopee_voucher"]||0)/100000;
                tongTienDuocGiamMggShopee += t7;
		let t8=(order["payment_info"]["coin_info"]["coin_earn_by_shopee_voucher"]||0);
		coin_earn += t8;

			});
			offset += si;			
			if(trangThaiDonHangConKhong) {					
				console.log('Đã thống kê được: ' + tongDonHang + ' đơn hàng. Đang lấy thêm dữ liệu....');
				xemBaoCaoThongKe();
			}
			else {
				tongTienHang=tongTienHang-(tongTienDuocGiamMggShopeeShop+tongTienDuocGiamMggShopee);
				tongTienTietKiem=tongTienDuocGiamMggShopee+tongTienDuocGiamMggShopeeShop+tongTienVanChuyenDuocGiam;
				var tongTienChiTieuX=pxgPrice(tongTienChiTieu);
				console.log("================================");
				console.log("%cSố tiền bạn ĐÃ ĐỐT vào Shopee là: "+"%c"+tongTienChiTieuX+" vnđ%c", "font-size: 20px;","font-size: 26px; color:orange;font-weigth:700", "font-size: 20px;");
				console.log("================================");
				console.log("%cTổng đơn hàng đã giao: "+"%c"+pxgPrice(tongDonHang)+" đơn hàng", "font-size: 20px;","font-size: 20px; color:green");
                console.log("%cTổng sản phẩm đã đặt: " + "%c" + pxgPrice(tongSanPhamDaMua)+" sản phẩm", "font-size: 20px;","font-size: 20px; color:#fc0000");
				console.log("%cTổng tiền hàng + phí vận chuyển khi CHƯA SỬ DỤNG các loại voucher: "+"%c"+pxgPrice(tongTienChiTieu+tongTienTietKiem)+" vnđ", "font-size: 24px;","font-size: 24px; color:orange;font-weigth:700");
				console.log("%cTổng tiền hàng khi chưa dùng Mã giảm giá: "+"%c"+pxgPrice(tongTienChiTieu+tongTienTietKiem-tongTienVanChuyenChuaGiam)+" vnđ", "font-size: 18px;","font-size: 18px; color:#fc0000");
				console.log("%cTổng tiền phí vận chuyển khi chưa dùng mã Freeship: "+"%c"+pxgPrice(tongTienVanChuyenChuaGiam)+" vnđ", "font-size: 18px;","font-size: 18px; color:#fc0000");
				console.log("================================");
				console.log("%cTổng tiền hàng + phí vận chuyển khi ĐÃ SỬ DỤNG các loại voucher: "+"%c"+tongTienChiTieuX+" vnđ%c", "font-size: 24px;","font-size: 24px; color:orange;font-weigth:700", "font-size: 20px;");
                console.log("%cTổng tiền phí vận chuyển đã trả: "+"%c"+pxgPrice(tongTienVanChuyenPhaiTra)+" vnđ", "font-size: 20px;","font-size: 20px; color:#fc0000");
				console.log("%c(1)Tổng tiền phí vận chuyển tiết kiệm được nhờ áp Mã Freeship: "+"%c"+pxgPrice(tongTienVanChuyenDuocGiam)+" vnđ", "font-size: 18px;","font-size: 18px; color:green");
				console.log("%c(2)Tổng tiền TIẾT KIỆM được nhờ áp Mã giảm giá Shopee: "+"%c"+pxgPrice(tongTienDuocGiamMggShopee)+" vnđ", "font-size: 18px;","font-size: 18px; color:green");
				console.log("%c(3)Tổng tiền TIẾT KIỆM được nhờ dùng Voucher của Shop: "+"%c"+pxgPrice(tongTienDuocGiamMggShopeeShop)+" vnđ", "font-size: 18px;","font-size: 18px; color:green");
				console.log("%c(4)Tổng Xu nhận được nhờ dùng Mã hoàn xu Shopee: "+"%c"+pxgPrice(coin_earn)+" xu", "font-size: 18px;","font-size: 18px; color:green;font-weigth:700");
				console.log("%c💰TỔNG TIẾT KIỆM(1+2+3+4): "+"%c"+pxgPrice(tongTienTietKiem+coin_earn)+" vnđ", "font-size: 24px;","font-size: 24px; color:orange;font-weigth:700");
				console.log("================================");
			}
		}
	};
	xhttp.open("GET", "https://shopee.vn/api/v1/orders/?order_type=3&offset="+offset+"&limit="+si, true);
	xhttp.send();
}
function pxgPrice(number, fixed=0) {
	if(isNaN(number)) return 0;
	number = number.toFixed(fixed);
	let delimeter = ',';
	number += '';
	let rgx = /(\d+)(\d{3})/;
	while (rgx.test(number)) {
		number = number.replace(rgx, '$1' + delimeter + '$2');
	}
	return number;
}
xemBaoCaoThongKe();
