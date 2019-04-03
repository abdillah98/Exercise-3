	
	/*
	*	DATA TABLE & FILTER DATA
	*	----------------------------
	*	
	*	@Created By : Abdillah AG
	*	Design Like Google Account
	*	

	
	*	Function loadData : 
	*	------------------- 
	*	Untuk mengambil data awal-
	*	setelah halaman dimuat.
	*/
	function loadData(api_url = null) {
		var url;
	  	xhttp = new XMLHttpRequest();
		
		if (api_url == null) {
			url = 'https://swapi.co/api/planets/?format=json&page=1';
		} else {
			url = api_url;
		}
	  
	  	xhttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
	    		data = JSON.parse(this.responseText);
	    		
	      		results = data.results;
	      		str = '';
	      		
	      		results.forEach(function(item) {
	    			str += '<tr>'+
	    				   '<td>'+ item.name +'</td>'+	
	    				   '<td>'+ item.rotation_period +'</td>'+	
	    				   '<td>'+ item.orbital_period +'</td>'+
	    				   '<td>'+ item.diameter +'</td>'+
	    				   '<td>'+ item.climate +'</td>'+
	    				   '<td>'+ item.gravity +'</td>'+
	    				   '<td><a href="#" onclick="detail(this)" data-url="'+item.url+'">lihat</td>'+
	    				   '<tr>';
	      		})

	    		document.querySelector("#table-data > tbody").innerHTML = str;
	    		document.querySelector("#total").innerHTML = data.count;
	    	}
	  	}
	  	xhttp.open("GET", url, true);
	  	xhttp.send();
	}



	/*
	*	Function detail : 
	*	-----------------
	*	Mengambil data detail dari set data-
	*	saat user menekan link lihat. 
	*/
	function detail(this_) {
		url = this_.getAttribute('data-url');
		modal = document.querySelector('#modal');
	  	xhttp = new XMLHttpRequest();

	    console.log(url)
	  	xhttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
	    		results = JSON.parse(this.responseText);

	    		modal.classList.remove('d-none');
	    		document.querySelector('#name').innerText = results.name;
	    		document.querySelector('#rotation').innerText = results.rotation_period;
	    		document.querySelector('#orbital').innerText = results.orbital_period;
	    		document.querySelector('#diameter').innerText = results.diameter;
	    		document.querySelector('#climate').innerText = results.climate;
	    		document.querySelector('#gravity').innerText = results.gravity;
	    		document.querySelector('#terrain').innerText = results.terrain;
	    		document.querySelector('#surface').innerText = results.surface_water;
	    		document.querySelector('#population').innerText = results.population;

	    	}
		}
		xhttp.open("GET", url, true);
	  	xhttp.send();
	}



	/*
	*	Function pagenation : 
	*	-----------------
	*	Mengambil data berikut dari set data-
	*	saat user menekan tombol next dan mengambil data 
	*	sebelumnya saat user menekan tombol back.
	*/
	function pagenation(this_) {
		number = this_.getElementsByTagName('span')[0].innerText
		total = document.querySelector('#total').innerText;
		page = parseInt(total / 10);
		api_url = 'https://swapi.co/api/planets/?format=json&page='+number;
		console.log(number)
		if (number > 1) {
			document.querySelector('#button-previous').classList.remove('d-none');
		}
		else {
			document.querySelector('#button-previous').classList.add('d-none');
		}

		if (number > page ) {
			document.querySelector('#button-next').classList.add('d-none');
		}
		else {
			document.querySelector('#button-next').classList.remove('d-none');
		}

		loadData(api_url)

		document.querySelector('#number-next').innerText = parseInt(number) + 1;
		document.querySelector('#number-previous').innerText = parseInt(number) - 1;

	}



	/*
	*	Function filterTable : 
	*	-----------------
	*	Untuk memfilter data sesuai dengan yang diinputkan user
	*/
	function filterTable(this_) {
	  	filter 	  = this_.value.toUpperCase();
	  	table 	  = document.querySelector("#table-data");
	  	table_row = table.getElementsByTagName("tr");
	  	
	  	for (i = 0; i < table_row.length; i++) {
	    	table_col = table_row[i].getElementsByTagName("td")[0];

	    	if (table_col) {
	      		valueText = table_col.textContent || table_col.innerText;
	      		
		      	if (valueText.toUpperCase().indexOf(filter) > -1) {
		        	table_row[i].style.display = "";
		      	} else {
		        	table_row[i].style.display = "none";
	      		}
	    	}       
	  	}
	}



	/*
	*	Function reset : 
	*	-----------------
	*	Untuk mengosongkan input text search.
	*/
	function reset() {
		document.querySelector('#search-input').innerText = '';
	}



	/*
	*	Function close_modal : 
	*	-----------------
	*	Untuk menutup modal yang sedang aktif
	*/
	function close_modal() {
		document.querySelector('#modal').classList.add('d-none');
	}