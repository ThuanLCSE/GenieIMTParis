var imgSrc = {
	'carrefour' : './img/crf.png',
	'leclerc' : './img/elec.png',
	'casino' : './img/csn.svg',
	'intermarche' : './img/inter.svg',
  'auchan' : './img/auch.svg',
  'lidl' : './img/lidl.png',
	'tabac' : './img/tabac.jpg',
  'pharmacie': './img/phar.png',
  'netto': './img/netto.png',
  'chinese': './img/chinese.png',
  'unknow' : "./img/logo.png"
}  
var dmdStatus = {
  "WAITING": 'waiting',
  "PROCESSING": 'processing',
  'done': "Les courses ont été livrés",
  'processing': "Demande en cours, prennez en contact afin de vérifiez la disponibilité des articles ",
  "processMessage": "INFO: le panier est accepté par l'acheteur, veuillez rester en contact",
  "validMessage": "INFO: le panier a été livré, l'acheteur recevra le crédit dans les plus brefs délais. Merci à tous de faire confiance à Bonjour, Courses",
  "cartneedThermoBag": "Les achats contiennent des articles surgelés, veuillez ajouter un sachet thermomatique dans la liste"
}

  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

function validatePhone(num){
  if(num.indexOf('+33')!=-1) num = num.replace('+33', '0');
  var re = /^0[1-7]\d{8}$/;
  return re.test(num);
}
function getStatusFrench(status) {
  switch (status) {
    case 'done' :
      return "Terminée";
      break;
    case 'waiting' :
      return "En attente";
      break;
    case 'processing' :
      return "En traitement";
      break;  
  }
}
function gotoBottom(id){
  var element = document.getElementById(id);
  element.scrollTop = element.scrollHeight - element.clientHeight;
}
function getCredit(){
  return $.post( "/users/getcredit", { 
      id:  Cookies.get('uId')
    })
}
function loadDemandByUser(){
  return $.get( "/demand/allme", { 
      userId:  Cookies.get('uId')
    })
}
function makeTransaction(userId,amount, description) {
  return $.post( "/trans/add", { 
    'userId': userId,
    'amount': amount,
    'time': (new Date()).getTime(),
    'description' : description
  })
}
var availableTags = [
  "lait demi écrémé",
  "oeuf bio",
  "banane",
  "pomme bio",
  "pizza bolognaise",
  "pizza royale",
  "chips classic",
  "cidre breton",
  "l'eau minérale",
  "yaourt fruit",
  "poivron rouge",
  "carotte",
  "nutella 250g",
  "jus d'orange",
  "vodka absolut 1l",
  "pizza bolognaise",
  "nescafé 3 en 1 ",
  "chips nature lays",
  "chips bolognaise 135g",
  "Jus ananas pressé sans sucres ajoutés TROPICANA",
  "Jus de fruits ananas fruit de la passion INNOCENT",
  "Jus d'orange bio CARREFOUR BIO 1L",
  "Jus de clémentines 100% pur jus ANDROS 1L"
];
var myCreditStr = function(data){
  return `Ton credit : <span class="badge badge-success">${data.a} ${data.c}</span>`
} 
var lstStores = []
loadStoreByPCode = function(code) {
  if (code.length === 5){
    $('#errPostCode').html("")
    $.post( "/store/findStore", { pcode: code })
    .done(function( data ) {
      $('#sltStoreName').prop( "disabled", false );
      $('#sltStoreBrand').prop( "disabled", false );
      $('#sltStoreBrand').empty()
      var check = {};
      lstStores = data
      for (const store of data) {
        if (check[store.brand] !== true) {
          check[store.brand] = true
          var optionValue = store.brand
          var optionText = store.brand
          $('#sltStoreBrand').append(`<option value="${optionValue}"> 
               ${optionText} 
          </option>`);
        }
      }
      $('#sltStoreBrand').append(`<option value="none"> 
           Autres
      </option>`);
      //trigger
      $("#sltStoreBrand").prop("selectedIndex", 0).val()
      $("#sltStoreBrand").change();   

    }).fail((e) => console.log(e));
  } else {
    $('#errPostCode').html("Code postal invalide")
  }
}
$('#sltStoreBrand').change(function() { 
  $('#sltStoreName').empty()
  for  (const store of lstStores) { 
    if (store.brand === $( this ).val()){  
      $('#sltStoreName').append(`<option value="${store._id}"> 
           ${store.name + ", " + store.address} 
      </option>`);    
    }
  }
  $('#sltStoreName').append(`<option value="none"> 
         Autres
    </option>`);
  $('#sltStoreName').change()
});
 
$('#sltStoreName').change(function() { 
  if ($( this ).val() === 'none') {
    // $( ".store-address-input" ).show();
    $( ".store-address-input" ).prop("disabled", false);
    $( ".store-address-input" ).val('')
  } else {
    $( ".store-address-input" ).prop("disabled", true);
    var nameAddress = ""
    for  (const store of lstStores) { 
      if (store._id === $( this ).val()) nameAddress = store.name+ ", " +store.address
    }
    $('#inpStoreAdress').val(nameAddress)
  }
});
var catFood = [
{
  'name': 'Alimentaire',
  'icon': 'fas fa-hotdog',
  'sub' : [
    {
      'name': 'Fruit',
      'icon': 'fas fa-apple-alt',
      'items' : [
        'Orange',
        'Pomme',
        'Citron',
        'Fraise',
        'Framboise',
        'Myrtille',
        'Raisin',
        'Banane',
        'Peche',
        'Nectarine',
        'Mangue',
        'Melon',
        'Pastèque',
        'Abricot',
        'Kiwi',
        'Poire'
      ]
    },
    {
      'name': 'Légumes',
      'icon': 'fab fa-canadian-maple-leaf',
      'items': [
        'Salade Batavia',
        'Salade Laitue',
        'Tomates cerises',
        'Tomates rondes',
        'Tomates rondes en grappe cocktail',
        'Salade sucrine ',
        'Salade Feuille de chêne',
        'Salade Laitue Iceberg',
        'Endives',
        'Concombre',
        'Betteraves rouges',
        'Radis',
        'Avocat',
        'Persil',
        'Basilic ',
        'Aneth',
        'Coriandre',
        'Menthe',
        'Ciboulette',
        'Artichaut blanc',
        'Artichaut violet',
        'Fenouil',
        'Haricots verts',
        'Brocoli',
        'Courgettes',
        'Aubergines',
        'Poivron',
        'Oignons jaunes',
        'Echalotes',
        'Oignons rouges',
        'Ail',
        'Oignons blanc botte',
        'Champignons blancs',
        'Champignons bruns',
        'Pommes de terre',
        'Carottes',
        'Patate',
        'Navets ronds',
        'Poireau',
        'Chou fleur'
      ]
    },
    {
      'name': 'Boucherie',
      'icon': 'fas fa-hotdog',
      'sub': [
        {
          'name': 'Boeuf',
          'icon': 'fas fa-hippo',
          'items': [
            'Viande bovine Cote de Boeuf',
            'Viande bovine roti',
            'Viande bovine Steak',
            'Viande bovine Bourguignon',
            'Viande bovine POT AU FEU',
            'Viande bovine  ENTRECOTE',
            'Boulettes au bœuf',
            'Viande hachée pur bœuf 5%',
            'Viande bovine FAUX FILET',
            'Viande bovine BOURGUIGNON',
            'Rôti de bœuf cuit',
            'Carpaccio bœuf',
            'Langue de bœuf sauce piquante',
            'Rognons de bœuf en dés'
          ]
        },{
          'name': 'Veau',
          'icon': 'fas fa-horse',
          'items' : [
            'Veau Blanquette',
            'Veau Roti',
            'Veau BLANQUETTE SANS OS',
            'Veau Escalope',
            'Veau Foie à rotir',
            'Paupiettes de veau',
            'Viande hachée veau',
            'Steak haché de veau'
          ]
        },{
          'name': 'Porc',
          'icon': 'fas fa-bacon',
          'items' : [
            'Filet mignon de porc',
            'Porc Longe sans os',
            'Porc Rouelle de Jambon',
            'Rôti de porc filet',
            'Filet de porc sans os',
            'Porc Palette cuite ',
            'Rôti de porc échine',
            'Paupiettes de porc',
            'Côtes de porc',
            'Filet mignon',
            'Poitrine de porc demi sel',
            'Jarret de porc demi sel',
            'Chipolatas porc',
            'Farce pur porc',
            'Pied porc',
            'Langue de porc'
            ]
        },{
          'name': 'Saucisse',
          'icon': 'fas fa-hotdog',
          'items': [
            'Saucisses traditionnelles',
            'Saucisse Txistorra',
            'Saucisses barbecue',
            'Saucisses aux oignons',
            'Saucisses aux herbes',
            'Saucisses fumées',
            'Saucisses natures',
            'Saucisses chipolatas',
            'Merguez',
            'Chair à saucisse'
          ]
        },
      ]
    },
    {
      'name': 'Volaille',
      'icon': 'fas fa-drumstick-bite',
      'items': [
        'Poulet jaune',
        'Poulet blanc',
        'Lapin entier',
        'Filets de poulet',
        'Aiguillettes de poulet',
        'Cuisse de lapin',
        'Filet de canard',
        'Poulet fumé',
        'Cuisses de canard',
        'Nuggets de poulet',
        'Cordons bleus de dinde',
        'Grignottes de poulet',
        'Rôti de filet de dinde',
        'Aiguillettes de poulet panées',
        'Cuisses de poulet',
        'Confit de manchons de canard',
        'Foies de volaille',
        'Panés dinde & poulet façon bolognaise',
        'Escalopes de dinde',
        'Foie gras de canard'
      ]
    },
    {
      'name': 'Poissonnerie',
      'icon': 'fas fa-fish',
      'sub':  [
        {
          'name': 'Surgelés',
          'icon': 'fas fa-snowflake',
          'items': [
          'Crevettes décortiquées',
          'Queues de langouste crues non décortiquées',
          'Gambas black tiger L entières',
          'Cabillaud 100% filet',
          'Filets de colin Alaska',
          "Tubes d'encornet",
          'Saumon rose',
          'Filet de merlu blanc',
          'Queues de crevettes cuites semi-décortiquées',
          'Crevettes entières crues',
          'Moules farcies persil et ail',
          'Cœurs filet de cabillaud',
          'Filets de Merlan',
          "Anneaux d'encornet",
          'Sole tropicale',
          'Seiches entières',
          'Crevettes sauvages',
          "Colin d'Alaska à la bordelaise",
          'Beignet à la romaine',
          "Colin d'Alaska à la parisienne",
          'Anneaux de calamars panure',
          'Filets de Rouget Barbet Cinnabare',
          'Homard canadien cuit entier',
          'Cuisses de grenouilles',
          'Dos de cabillaud',
          'Pavés de saumon rose']
        },{
          'name': 'Frais',
          'icon': 'fas fa-concierge-bell',
          'items': [
          'Filets de limande façon meunière',
          'Pavés de saumon',
          'Saumon fumé',
          'Cœur de saumon',
          'Surimi tendre',
          'Filets de Cabillaud',
          'Truite fumée',
          "Filets d'anchois à l'huile d'olive",
          'Lardons saumon fumé',
          'Truite pavés',
          'Filet merlan sans arêtes',
          'Plat cuisiné brandade de morue',
          'Blinis Cocktail',
          "Filets de colin d'Alaska panés",
          'Filets de maquereau fumés au poivre',
          'Tarama blanc',
          'Accras de morue',
          'Crevettes entières cuites',
          'Emincés de truite fumée',
          'Feuilletés empanadas aux crevettes',
          'Rillettes de thon',
          'Rillettes de saumon',
          'Anchois marinés à l ail',
          'Noix de Saint-Jacques',
          'Œufs de truite',
          'Plat cuisiné parmentier au saumon',
          'Filets de harengs',
          'Filets de morue',
          'Houmous au basilic',
          'Œufs de lompe rouges ',
          'Plat cuisiné paëlla',
          'Queues de gambas marinées ail',
          'Terrine aux 2 saumons']
        },
      ]
    },
    {
      'name': 'Boulangerie',
      'icon': 'fas fa-bread-slice',
      'items': [
        'Levure de boulanger pains et brioches',
        'Levure du Boulanger',
        'Pain complet',
        'Fougasse lardons',
        'Boule',
        'Fougasse chèvre',
        'Fougasse olives',
        'Baguette',
        'Baguette Rustique',
        'Pain de mie',
        'Pain de campagne',
        'Baguette céréales',
        'Pain aux céréales',
        'Déjeunettes',
        'Pain au noix',
        'Biscuits palmiers',
        'Madeleines',
        "Sablés d'armor",
        'Gâteau',
        'Financiers amandes',
        'Brioche pépites de chocolat',
        'Croissants au levain',
        'Barre pâtissière aux œufs',
        'Brioche tranchée',
        'Eclairs café',
        'Demi-baguettes précuites',
        'Muffins',
        'Pain Pita',
        'Pain de mie',
        'Pain de mie complet']
    },
    {
      'name': 'Crémerie',
      'icon': 'fas fa-blender',
      'sub': [
        { 'name': 'Oeufs',
          'icon': 'fas fa-egg',
          'items': [
            'Oeufs frais',
            'Oeufs plein air',
            'Oeufs gros',
            'Oeufs de caille'
          ]
        },{ 
          'name': 'Produit laitier',
          'icon': 'fas fa-ice-cream',
          'items' : [
          'Emmental râpé',
          'Beurre doux',
          'Crème semi-épaisse',
          'Lait demi-écrémé',
          'Fromage de chèvre',
          'Parmesan râpé',
          'Yaourt nature',
          'Comté',
          'Crème liquide entière',
          'Grana Padano râpé',
          'Crème fraîche épaisse entière',
          'Fromage hamburger au cheddar',
          'Mascarpone',
          'Beurre moulé demi-sel',
          '']
        }
      ]
    },
    {
      'name': 'Végétarien',
      'icon': 'fas fa-seedling',
      'items': [
      'Pâtes penne de lentilles corail',
      'Fusilli de pois cassé',
      'Plat cuisiné tajine de légumes',
      'Plat cuisiné boulettes pois chiche boulgour',
      'Plat cuisiné curry riz lentille lait coco',
      'Plat cuisiné Ravioli végétariens',
      'Plat cuisiné céréales fruits secs menthe',
      'Pizza 4 Stagioni',
      'Pizza Végétale']
    },
    {
      'name': 'Pizza',
      'icon': 'fas fa-pizza-slice',
      'items': [
      'Pizza Tirolese',
      'Pizza Prosciutto',
      'Pizza chèvre',
      'Pizza jambon/fromages',
      'Pizza Farmer poulet sauce bbq',
      'Pizza Margherita',
      'Pizza Regina',
      'Pizza Crust',
      'Pizza Campanella',
      'Pizza bolognaise',
      'Pizza chorizo',
      'Pizza royale',
      'Pizza chèvre lardons fumés',
      'Pizza emmental jambon champignons',
      'Pizza Thon']
    },
  ]
},
{
  'name': 'Animalerie',
  'icon': 'fas fa-paw',
  'sub': [
    {
      'name': 'Alimentaire',
      'icon': 'fas fa-cookie-bite',
      'items': [
      'Croquettes pour chiens chevreuil canard',
      'Litière Hygiène',
      'Biscuits pour chiens',
      'Pâtée pour chats stérilisés ',
      'Croquettes pour chat',
      'Friandises pour chat au saumon',
      'Bouchées pour chien']
    },{
      'name': 'Accessoire',
      'icon': 'fas fa-bone',
      'items': [
      'Collier pour chien nylon',
      'Jouet pour chien Strong Bone',
      'Jouet pour chien canard en peluche',
      'Bol pour chien',
      'Bol pour chat',
      'Laisse flexi',
      'Shampooing pour chien',
      'Panier pour chien & chat',
      'Frisbee pour chien']
    },
  ]
},
{
  'name': 'Beauté',
  'icon': 'fas fa-magic',
  'items': [
  'Papier toilette',
  'Mouchoirs',
  'Gel douche',
  'Coton-tiges',
  'Gel désinfectant mains',
  'Coloration rouge',
  'Eau de parfum fleur',
  'Savon liquide',
  'Dentifrice',
  'Coton maxi',
  'Coton maxi']
},
{
  'name': 'Bébé',
  'icon': 'fas fa-baby',
  'items':[
    'biscuits bébé',
    'Coton-tiges bébé',
    'Couches bébé',
    "Coussinet d'allaitement",
    'Dessert bébé',
    'Eau micellaire nettoyante',
    'Gel lavant corps et cheveux ',
    'Lait de toilette',
    'Lingettes bébé',
    'Plat bébé',
    'Biberon framboise à poignées',
    'Goupillon et rince tétine',
    'Lait bébé',
    'Céréales bébé',
    'Lait et céréales bébé']
},
{
  'name': 'Boisson',
  'icon': 'fas fa-water',
  'sub' : [
    {
      'name': 'Non-alcoolisée',
      'icon': 'fas fa-tint',
      'items' : [
        'Boisson lactée au café',
        'Boisson lactée pêche abricot sans sucres',
        'Boisson lactée orange banane fraise sans sucres',
        'Boisson lactée au chocolat',
        'Boisson lactée à la fraise',
        'Boisson lactée à la vanille',
        'Boisson lactée au café caramel'
      ]
    },
    {
      'name': 'Alcool',
      'icon': 'fas fa-glass-cheers',
      'items': [
      'Cidre',
      'Vin blanc',
      'Vin Rouge',
      'Bière de prestige',
      'Bière blonde',
      'Bière rouge',
      'Bière IPA',
      'Whisky',
      'Vodka',
      'Gin',
      'Rhum Arrangé',
      'Rhum',
      'Bière aromatisée',
      'Pastis de Marseille',
      'Punch planteur à base de rhum']
    }]
},
{
  'name': 'Bricolage',
  'icon': 'fas fa-tools',
  'items': [
  'Mise à niveau et détection',
  'Clé et douille',
  'Coffret et boîte à outils complète',
  'Mesure et traçage',
  'Pistolet à colle et agrafeuse',
  'Scie à main',
  'Pince et tenaille',
  'Tournevis',
  'Abrasif et papier de verre',
  'Serre-joint',
  'Cutter, scalpel et ciseaux',
  'Filetage et taraudage',
  'Marteau',
  'Lime et râpe',
  'Perceuse',
  'Perforateur, burineur, marteau-piqueur',
  'Visseuse, tournevis électrique',
  'Clé à choc, boulonneuse',
  'Scie électrique portative',
  'Ponceuse électrique',
  'Polisseuse',
  'Rabot électrique',
  'Décapeur thermique',
  'Défonceuse, lamelleuse',
  'Meuleuse et rainureuse',
  'Agrafeuse, cloueuse électrique',
  'Pistolet à colle',
  'Malaxeur électrique',
  'Mini outils de précision',
  'Outil multifonctions',
  'Batterie et chargeur']
},
{
  'name': 'Electroménager',
  'icon': 'fas fa-blender',
  'items' :[
  'Blender avec lame',
  'Grille-pain',
  'Bouilloire électrique',
  'Mixeur',
  'Brosse à dents électrique',
  'Wok aluminium',
  'Friteuse',
  'Marmite',
  'Diffuseur mijoteur',]
}
]
/*,
{
  'name': 'Epicerie'
  'icon': 'fab fa-pepper-hot',
},
{
  'name': 'Vêtement'
  'icon': 'fab fa-tshirt',
},
{
  'name': 'Parapharmacie'
  'icon': 'fab fa-star-of-life',
},
{
  'name': 'Bagagerie'
  'icon': 'fab fa-luggage-cart',
}*/