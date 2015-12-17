getTreeMapData();
var points = []

$(document).ready(function(){
	$('#bill-by-committee').highcharts({
	    series: [{
	        type: 'treemap',
	        layoutAlgorithm: 'squarified',
	        allowDrillToNode: true,
	        dataLabels: {
	            enabled: false
	        },
	        levelIsConstant: false,
	        levels: [{
	            level: 1,
	            layoutAlgorithm: 'squarified',
	            color: 'red',
	            dataLabels: {
	                enabled: true
	            },
	            borderWidth: 3
	        },
	        {
	            level: 2,
	            layoutAlgorithm: 'squarified',
	            color: 'blue',
	            dataLabels: {
	                enabled: false
	            },
	        }],
	        data: points
	    }],
	    title: {
	        text: 'Bills by Committee (Per Session)'
	    }
	});
});

function getTreeMapData(){
	$.ajax({
		type: 'GET',
		url: '/bills/bill_list'
	}).done(function(response){
		getCommitteeCounts(response)
	}).fail(function(error){
		console.log(error)
	});
};

function getCommitteeCounts(tree_data){
	$.ajax({
		type: 'GET',
		url: '/bills/tree_data'
	}).done(function(response){
		populateTreeMap(tree_data, response)
	}).fail(function(error){
		console.log(error)
	});
};

function populateTreeMap(tree_data, committee_counts) {
	var chart_data = {}
	for (var i = 0; i < tree_data.length; i++){
		var treeMapData = {}
		var innerData = {}
		var committee_name = tree_data[i].committees.committee_name
		var title = tree_data[i].short_title ? tree_data[i].short_title : tree_data[i].official_title
		treeMapData[title] = innerData
		innerData['url'] = '1' //String(committee_counts[committee_name])
		chart_data[committee_name] = treeMapData
	}
	// console.log(chart_data)
	// organizeData(chart_data)

	// function organizeData(chart_data){
		var org = function(){
			var data = chart_data,
		    points = [],
		    regionP,
		    regionVal,
		    regionI = 0,
		    countryP,
		    countryI,
		    causeP,
		    causeI,
		    region,
		    country,
		    cause,
		    causeName = {
		        // "url": "<a href='#'>Click for bill details'</a>",
		        'url': 'This is the text from the value of Description under causeName',
		        // 'IDforBill': 'Bill id'
		    };
			for (region in data) {
		       if (data.hasOwnProperty(region)) {
		           regionVal = 0;
		           regionP = {
		               id: 'id_' + regionI,
		               name: region,
		               color: Highcharts.getOptions().colors[regionI]
		           };
		           countryI = 0;
		           for (country in data[region]) {
		               if (data[region].hasOwnProperty(country)) {
		                   countryP = {
		                       id: regionP.id + '_' + countryI,
		                       name: country,
		                       parent: regionP.id
		                   };
		                   points.push(countryP);
		                   causeI = 0;
		                   for (cause in data[region][country]) {
		                       if (data[region][country].hasOwnProperty(cause)) {
		                           causeP = {
		                               id: countryP.id + '_' + causeI,
		                               name: causeName[cause],
		                               parent: countryP.id,
		                               value: Math.round(+data[region][country][cause])
		                           };
		                           regionVal += causeP.value;
		                           points.push(causeP);
		                           causeI = causeI + 1;
		                       }
		                   }
		                   countryI = countryI + 1;
		               }
		           }
		           regionP.value = Math.round(regionVal / countryI);
		           points.push(regionP);
		           regionI = regionI + 1;
		       }
		    }
		// for (committee in chartData) {
		//     if (chartData.hasOwnProperty(committee)) {
		//         committeeVal = 0;
		//         committeeP = {
		//             id: 'id_' + committeeI,
		//             name: committee,
		//             color: Highcharts.getOptions().colors[committeeI]
		//         };
		//         indvBillsI = 0;
		//         for (indvBills in chartData[committee]) {
		//             if (chartData[committee].hasOwnProperty(indvBills)) {
		//                 indvBillsP = {
		//                     id: committeeP.id + '_' + indvBillsI,
		//                     name: indvBills,
		//                     parent: committeeP.id
		//                 };
		//                 points.push(indvBillsP);
		//                 causeI = 0;
		//                 for (cause in chartData[committee][indvBills]) {
		//                     if (chartData[committee][indvBills].hasOwnProperty(cause)) {
		//                         causeP = {
		//                             id: indvBillsP.id + '_' + causeI,
		//                             name: causeName[cause],
		//                             parent: indvBillsP.id,
		//                             value: Math.round(+chartData[committee][indvBills][cause])
		//                         };
		//                         committeeVal += causeP.value;
		//                         points.push(causeP);
		//                         causeI = causeI + 1;
		//                     }
		//                 }
		//                 indvBillsI = indvBillsI + 1;
		//             }
		//         }
		//         committeeP.value = Math.round(committeeVal / indvBillsI);
		//         points.push(committeeP);
		//         committeeI = committeeI + 1;
		//     }
		// }
	};
};

