function result() {
	//variables
	var hp = Number(document.getElementById('hp').value),
	fTalent = document.getElementById('firstTalent'),
	i = fTalent.selectedIndex,
	sTalent = document.getElementById('secondTalent'),
	j = sTalent.selectedIndex,
	hpResult = (hp+Number(fTalent.options[i].value) + 
		Number(sTalent.options[j].value)).toFixed(0),
	elixirs = document.getElementById('elixirs'),
	k = elixirs.selectedIndex,
	elixirsLife = document.getElementById('elixirsLife'),
	l = elixirsLife.selectedIndex;
	if (i>4) {
		var hpFirstTalent = Number(fTalent.options[i].value);
	} else {
		var hpFirstTalent = 0;
	}
	if (j>4) {
		var hpSecondTalent = Number(sTalent.options[j].value);
	} else {
		var hpSecondTalent = 0;
	}
	var hpGig = (Number(hpResult) *
		(1 + Number(elixirs.options[k].value))).toFixed(0),
	hpLife = (hpGig*(Number(elixirsLife.options[l].value)+
		hpFirstTalent+hpSecondTalent)).toFixed(0),
	addedLife = (hpLife - hp*(1 + Number(elixirs.options[k].value)) * 
	Number(elixirsLife.options[l].value)).toFixed(0),
	addedHp = hpGig- hp*(1 + Number(elixirs.options[k].value));


	//output
	document.getElementById('hpResult').innerHTML = hpResult;
	document.getElementById('hpGig').innerHTML = hpGig;
	document.getElementById('hpLife').innerHTML = hpLife;
	document.getElementById('addedLife').innerHTML = addedLife;
	document.getElementById('addedHp').innerHTML = addedHp;
}
