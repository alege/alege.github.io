$(document).ready(function() {
	$('select').material_select();
});
$('input[name=honourSwitch]').change(function(){
	if($(this).is(':checked')) {
		$('.honour-wrapper .select-dropdown').prop('disabled', false);
		$('.honour-wrapper .caret').removeClass('disabled');
		$('#block-1 select, #block-3 select').val(20);
	} else {
		$('.honour-wrapper .select-dropdown').prop('disabled', true);
		$('.honour-wrapper .caret').addClass('disabled');
		$('#block-1 select, #block-3 select').val(0);
	}    
});
$('#countElixirs').html(
	"Выберите количество эликсиров жизни в слотах (перетаскивайте ползунок) : " + $('#test5').val());
function showVal(newVal) {
	$('#countElixirs').html(
		"Выберите количество эликсиров жизни в слотах: " + newVal);
};
function cloneBlock(block) {
	$('#block-1>').clone().appendTo(block);
};
cloneBlock('#block-2');
cloneBlock('#block-3');
cloneBlock('#block-4');
$('#block-2 label, #block-4 label').html('Талант за кодекс "Жизненная сила"');
function result(firstId,secondId,recepient) {
	var startHp = Number($('#hp').val());
	if(startHp<1) {
		alert('Введите ваш уровень здоровья вверху страницы!')
	} else {
		var elixirGig = Number($('#giants').val()),
		elixirLife = Number($('#lifes').val()),
		value1 = Number($(firstId).val()),
		value2 = Number($(secondId).val()),
		healBonus = 1,
		talentedLife = startHp,
		countLifeElixirs = Number($('#test5').val());
		if (value1>19) {
			talentedLife += value1;
		} if (value2>19) {
			talentedLife += value2;
		} if (value1<2) {
			healBonus = value1;
		} if (value1==0) {
			healBonus = 1;
		} if (value2<2) {
			healBonus = (healBonus*value2).toFixed(4);
		}
		var hpWithGig = (talentedLife*elixirGig).toFixed(0),
		healing = (hpWithGig*elixirLife*healBonus).toFixed(0),
		gigHpBonus = (hpWithGig-(startHp*elixirGig)).toFixed(0),
		bonusHealing = (healing-(startHp*elixirGig*elixirLife)).toFixed(0),
		allSlotsBonus = Number(gigHpBonus)+(bonusHealing*countLifeElixirs);
		$(recepient).html(
			"Уровень жизни: "+talentedLife+
			"<br>Под эликсиром гиганта: "+hpWithGig+
			"<br>Лечение от эликсира жизни: "+healing+
			"<br>Бонус к здоровью (под гигантом за счет талантов): "+gigHpBonus+
			"<br>Бонусное лечение от 1 эликсира (за счет талантов): "+bonusHealing+
			"<br><b>Суммарный бонус при использовании всех слотов: "+allSlotsBonus+"</b>"
			);
		// $('.iyozzh>img').show();
	}
};
