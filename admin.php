<?php
session_start();

include("includes/db_functions.php");

if(!isset($_SESSION["IS_OPEN"])) {
	header("Location: login.php");
	exit;
}
?>

<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8"/>

        <title>Awesome Map</title>

        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

        <link
            href='http://fonts.googleapis.com/css?family=Kaushan+Script'
            rel='stylesheet'
            type='text/css'>
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/font-awesome.min.css" rel="stylesheet">
        <link href="css/styles.css" rel="stylesheet">
        <link href="css/awesome_map.css" rel="stylesheet">
        <link href="css/bootstrap-select.min.css" rel="stylesheet">

        <script type="text/javascript">
            var adm_path = "";
        </script>

        <script src="js/jquery-1.10.2.min.js" type="text/javascript"></script>
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <script
            src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"
            type="text/javascript"></script>
        <script type="text/javascript" src="js/infobox.js"></script>
        <script src="js/markerwithlabel.js" type="text/javascript"></script>
        <script src="js/tinymce/jquery.tinymce.min.js" type="text/javascript"></script>
        <script src="js/jscolor.js" type="text/javascript"></script>
        <script src="js/awm_marker.js" type="text/javascript"></script>
        <script src="js/bootstrap-select.min.js" type="text/javascript"></script>
        <script src="js/markerclusterer.js" type="text/javascript"></script>
        <script src="js/jquery.awm_upload.js" type="text/javascript"></script>

        <script src="js/awesome_map_admin.js" type="text/javascript"></script>
    </head>

    <body>
        <div class="container">
            <div class="title">
                Awesome Map
            </div>
            <div class="alert alert-info">
                Move the marker (<img src="img/pin.png" alt="Pin" class="pin_marker_example"/>) where you want to add a new location.
            </div>
            <form>
                <div class="checkbox">
                    <label>
                        <input name="check_search_bar" class="check_search_bar" type="checkbox">
                        Show the autocomplete search bar on the map
                    </label>
                </div>
                <div class="checkbox">
                    <label>
                        <input
                            name="check_cluster"
                            class="check_cluster"
                            style='margin-top:11px;'
                            type="checkbox">
                        Use "Marker Clusterer" (it will show a clickable icon (<img style='height:37px' src='img/markerclusterer/m1.png' alt=''/>) when there are a lot of markers in one location)
                    </label>
                </div>
                <div class="well" style="padding-top: 10px;">
                    <h5>Map Theme</h5>
                    <div class="btn-group btn-theme" data-toggle="buttons">
                        <label class="btn btn-primary active" data-value="normal">
                            <input type="checkbox">
                            Normal Map
                        </label>
                        <label class="btn btn-primary" data-value="pale">
                            <input type="checkbox">
                            Pale Dawn
                        </label>
                        <label class="btn btn-primary" data-value="subtle">
                            <input type="checkbox">
                            Subtle Grayscale
                        </label>
                        <label class="btn btn-primary" data-value="blue">
                            <input type="checkbox">
                            Blue water
                        </label>
                        <label class="btn btn-primary" data-value="neutral">
                            <input type="checkbox">
                            Neutral Blue
                        </label>
                        <label class="btn btn-primary" data-value="bright">
                            <input type="checkbox">
                            Bright & Bubbly
                        </label>
                        <label class="btn btn-primary" data-value="snazzy">
                            <input type="checkbox">
                            Snazzy Maps
                        </label>
                    </div>
                </div>
            </form>
            <form class="awm_search">
                <input
                    type="text"
                    class="form-control"
                    id="location"
                    placeholder="Enter the location where you want to go.">
            </form>
            <div id="awm_map" class="col-md-12 map"></div>
            <div class="save_map_block clearfix well" style="padding-left:0;">
                <div class="alert alert-success success-saved" style="display:none;">Saved !</div>
                <a href="" class="btn btn-success save_this_map">
                    <i class="fa fa-check"></i>
                    Save the Map</a>
            </div>
        </div>
        <div id="pin_creator" class="modal fade">
            <div class="modal-dialog modal-dialog-center">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Pin Creator</h4>
                    </div>
                    <div class="modal-body">
                        <form
                            role="form"
                            id="up_form"
                            method="POST"
                            enctype="multipart/form-data"
                            action='upload.php'>
                            <input type="hidden" class="mapaw_lat" value=""/>
                            <input type="hidden" class="mapaw_lng" value=""/>
                            <div class="mapaw_part1">
                                <div class="alert alert-info">
                                    New Pin for the address :
                                    <div class="modal_address"></div>
                                </div>
                                <fieldset>
                                    <legend>General Informations</legend>
                                    <div class="form-group">
                                        <label for="Name">Name</label>
                                        <input
                                            type="text"
                                            class="form-control mapaw_name"
                                            id="Name"
                                            placeholder="The name of your pin which will appear in bold.">
                                    </div>
                                    <div class="form-group">
                                        <label for="Description">Description</label>
                                        <textarea
                                            class="form-control mapaw_desc"
                                            id="Description"
                                            placeholder="The description of your pin. It can be the slogan of a shop or whatever you want."></textarea>
                                    </div>
                                    <div class="form-group streetview_preview_form">
                                        <hr/>
                                        <label>
                                            <input type="checkbox" class="sv_preview">
                                            Add a StreetView Preview
                                        </label>
                                        <div class="or_preview">
                                            OR
                                        </div>
                                        <label>
                                            <input type="checkbox" class="oi_preview">
                                            Add your Own Image
                                        </label>
                                        <div class="well oi_well">
                                            <input type="file" class="oi_image" name="oi_image" style="display:inline;"/>
                                            <div class="alert alert-info oi_preview_up"></div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="mapaw_part2">
                                <fieldset>
                                    <legend>Icon Customization</legend>
                                    <label>Icon</label>
                                    <select class="mapaw_icon form-control" id="Icon">
                                        <option value="1">&#xf000;</option>
                                        <option value="2">&#xf001;</option>
                                        <option value="3">&#xf002;</option>
                                        <option value="4">&#xf003;</option>
                                        <option value="5">&#xf004;</option>
                                        <option value="6">&#xf005;</option>
                                        <option value="7">&#xf006;</option>
                                        <option value="8">&#xf007;</option>
                                        <option value="9">&#xf008;</option>
                                        <option value="10">&#xf009;</option>
                                        <option value="11">&#xf00a;</option>
                                        <option value="12">&#xf00b;</option>
                                        <option value="13">&#xf00c;</option>
                                        <option value="14">&#xf00d;</option>
                                        <option value="15">&#xf00e;</option>
                                        <option value="16">&#xf010;</option>
                                        <option value="17">&#xf011;</option>
                                        <option value="18">&#xf012;</option>
                                        <option value="19">&#xf013;</option>
                                        <option value="20">&#xf014;</option>
                                        <option value="21">&#xf015;</option>
                                        <option value="22">&#xf016;</option>
                                        <option value="23">&#xf017;</option>
                                        <option value="24">&#xf018;</option>
                                        <option value="25">&#xf019;</option>
                                        <option value="26">&#xf01a;</option>
                                        <option value="27">&#xf01b;</option>
                                        <option value="28">&#xf01c;</option>
                                        <option value="29">&#xf01d;</option>
                                        <option value="30">&#xf01e;</option>
                                        <option value="31">&#xf021;</option>
                                        <option value="32">&#xf022;</option>
                                        <option value="33">&#xf023;</option>
                                        <option value="34">&#xf024;</option>
                                        <option value="35">&#xf025;</option>
                                        <option value="36">&#xf026;</option>
                                        <option value="37">&#xf027;</option>
                                        <option value="38">&#xf028;</option>
                                        <option value="39">&#xf029;</option>
                                        <option value="40">&#xf02a;</option>
                                        <option value="41">&#xf02b;</option>
                                        <option value="42">&#xf02c;</option>
                                        <option value="43">&#xf02d;</option>
                                        <option value="44">&#xf02e;</option>
                                        <option value="45">&#xf02f;</option>
                                        <option value="46">&#xf030;</option>
                                        <option value="47">&#xf031;</option>
                                        <option value="48">&#xf032;</option>
                                        <option value="49">&#xf033;</option>
                                        <option value="50">&#xf034;</option>
                                        <option value="51">&#xf035;</option>
                                        <option value="52">&#xf036;</option>
                                        <option value="53">&#xf037;</option>
                                        <option value="54">&#xf038;</option>
                                        <option value="55">&#xf039;</option>
                                        <option value="56">&#xf03a;</option>
                                        <option value="57">&#xf03b;</option>
                                        <option value="58">&#xf03c;</option>
                                        <option value="59">&#xf03d;</option>
                                        <option value="60">&#xf03e;</option>
                                        <option value="61">&#xf040;</option>
                                        <option value="62">&#xf041;</option>
                                        <option value="63">&#xf042;</option>
                                        <option value="64">&#xf043;</option>
                                        <option value="65">&#xf044;</option>
                                        <option value="66">&#xf045;</option>
                                        <option value="67">&#xf046;</option>
                                        <option value="68">&#xf047;</option>
                                        <option value="69">&#xf048;</option>
                                        <option value="70">&#xf049;</option>
                                        <option value="71">&#xf04a;</option>
                                        <option value="72">&#xf04b;</option>
                                        <option value="73">&#xf04c;</option>
                                        <option value="74">&#xf04d;</option>
                                        <option value="75">&#xf04e;</option>
                                        <option value="76">&#xf050;</option>
                                        <option value="77">&#xf051;</option>
                                        <option value="78">&#xf052;</option>
                                        <option value="79">&#xf053;</option>
                                        <option value="80">&#xf054;</option>
                                        <option value="81">&#xf055;</option>
                                        <option value="82">&#xf056;</option>
                                        <option value="83">&#xf057;</option>
                                        <option value="84">&#xf058;</option>
                                        <option value="85">&#xf059;</option>
                                        <option value="86">&#xf05a;</option>
                                        <option value="87">&#xf05b;</option>
                                        <option value="88">&#xf05c;</option>
                                        <option value="89">&#xf05d;</option>
                                        <option value="90">&#xf05e;</option>
                                        <option value="91">&#xf060;</option>
                                        <option value="92">&#xf061;</option>
                                        <option value="93">&#xf062;</option>
                                        <option value="94">&#xf063;</option>
                                        <option value="95">&#xf064;</option>
                                        <option value="96">&#xf065;</option>
                                        <option value="97">&#xf066;</option>
                                        <option value="98">&#xf067;</option>
                                        <option value="99">&#xf068;</option>
                                        <option value="100">&#xf069;</option>
                                        <option value="101">&#xf06a;</option>
                                        <option value="102">&#xf06b;</option>
                                        <option value="103">&#xf06c;</option>
                                        <option value="104">&#xf06d;</option>
                                        <option value="105">&#xf06e;</option>
                                        <option value="106">&#xf070;</option>
                                        <option value="107">&#xf071;</option>
                                        <option value="108">&#xf072;</option>
                                        <option value="109">&#xf073;</option>
                                        <option value="110">&#xf074;</option>
                                        <option value="111">&#xf075;</option>
                                        <option value="112">&#xf076;</option>
                                        <option value="113">&#xf077;</option>
                                        <option value="114">&#xf078;</option>
                                        <option value="115">&#xf079;</option>
                                        <option value="116">&#xf07a;</option>
                                        <option value="117">&#xf07b;</option>
                                        <option value="118">&#xf07c;</option>
                                        <option value="119">&#xf07d;</option>
                                        <option value="120">&#xf07e;</option>
                                        <option value="121">&#xf080;</option>
                                        <option value="122">&#xf081;</option>
                                        <option value="123">&#xf082;</option>
                                        <option value="124">&#xf083;</option>
                                        <option value="125">&#xf084;</option>
                                        <option value="126">&#xf085;</option>
                                        <option value="127">&#xf086;</option>
                                        <option value="128">&#xf087;</option>
                                        <option value="129">&#xf088;</option>
                                        <option value="130">&#xf089;</option>
                                        <option value="131">&#xf08a;</option>
                                        <option value="132">&#xf08b;</option>
                                        <option value="133">&#xf08c;</option>
                                        <option value="134">&#xf08d;</option>
                                        <option value="135">&#xf08e;</option>
                                        <option value="136">&#xf090;</option>
                                        <option value="137">&#xf091;</option>
                                        <option value="138">&#xf092;</option>
                                        <option value="139">&#xf093;</option>
                                        <option value="140">&#xf094;</option>
                                        <option value="141">&#xf095;</option>
                                        <option value="142">&#xf096;</option>
                                        <option value="143">&#xf097;</option>
                                        <option value="144">&#xf098;</option>
                                        <option value="145">&#xf099;</option>
                                        <option value="146">&#xf09a;</option>
                                        <option value="147">&#xf09b;</option>
                                        <option value="148">&#xf09c;</option>
                                        <option value="149">&#xf09d;</option>
                                        <option value="150">&#xf09e;</option>
                                        <option value="151">&#xf0a0;</option>
                                        <option value="152">&#xf0a1;</option>
                                        <option value="153">&#xf0f3;</option>
                                        <option value="154">&#xf0a3;</option>
                                        <option value="155">&#xf0a4;</option>
                                        <option value="156">&#xf0a5;</option>
                                        <option value="157">&#xf0a6;</option>
                                        <option value="158">&#xf0a7;</option>
                                        <option value="159">&#xf0a8;</option>
                                        <option value="160">&#xf0a9;</option>
                                        <option value="161">&#xf0aa;</option>
                                        <option value="162">&#xf0ab;</option>
                                        <option value="163">&#xf0ac;</option>
                                        <option value="164">&#xf0ad;</option>
                                        <option value="165">&#xf0ae;</option>
                                        <option value="166">&#xf0b0;</option>
                                        <option value="167">&#xf0b1;</option>
                                        <option value="168">&#xf0b2;</option>
                                        <option value="169">&#xf0c0;</option>
                                        <option value="170">&#xf0c1;</option>
                                        <option value="171">&#xf0c2;</option>
                                        <option value="172">&#xf0c3;</option>
                                        <option value="173">&#xf0c4;</option>
                                        <option value="174">&#xf0c5;</option>
                                        <option value="175">&#xf0c6;</option>
                                        <option value="176">&#xf0c7;</option>
                                        <option value="177">&#xf0c8;</option>
                                        <option value="178">&#xf0c9;</option>
                                        <option value="179">&#xf0ca;</option>
                                        <option value="180">&#xf0cb;</option>
                                        <option value="181">&#xf0cc;</option>
                                        <option value="182">&#xf0cd;</option>
                                        <option value="183">&#xf0ce;</option>
                                        <option value="184">&#xf0d0;</option>
                                        <option value="185">&#xf0d1;</option>
                                        <option value="186">&#xf0d2;</option>
                                        <option value="187">&#xf0d3;</option>
                                        <option value="188">&#xf0d4;</option>
                                        <option value="189">&#xf0d5;</option>
                                        <option value="190">&#xf0d6;</option>
                                        <option value="191">&#xf0d7;</option>
                                        <option value="192">&#xf0d8;</option>
                                        <option value="193">&#xf0d9;</option>
                                        <option value="194">&#xf0da;</option>
                                        <option value="195">&#xf0db;</option>
                                        <option value="196">&#xf0dc;</option>
                                        <option value="197">&#xf0dd;</option>
                                        <option value="198">&#xf0de;</option>
                                        <option value="199">&#xf0e0;</option>
                                        <option value="200">&#xf0e1;</option>
                                        <option value="201">&#xf0e2;</option>
                                        <option value="202">&#xf0e3;</option>
                                        <option value="203">&#xf0e4;</option>
                                        <option value="204">&#xf0e5;</option>
                                        <option value="205">&#xf0e6;</option>
                                        <option value="206">&#xf0e7;</option>
                                        <option value="207">&#xf0e8;</option>
                                        <option value="208">&#xf0e9;</option>
                                        <option value="209">&#xf0ea;</option>
                                        <option value="210">&#xf0eb;</option>
                                        <option value="211">&#xf0ec;</option>
                                        <option value="212">&#xf0ed;</option>
                                        <option value="213">&#xf0ee;</option>
                                        <option value="214">&#xf0f0;</option>
                                        <option value="215">&#xf0f1;</option>
                                        <option value="216">&#xf0f2;</option>
                                        <option value="217">&#xf0a2;</option>
                                        <option value="218">&#xf0f4;</option>
                                        <option value="219">&#xf0f5;</option>
                                        <option value="220">&#xf0f6;</option>
                                        <option value="221">&#xf0f7;</option>
                                        <option value="222">&#xf0f8;</option>
                                        <option value="223">&#xf0f9;</option>
                                        <option value="224">&#xf0fa;</option>
                                        <option value="225">&#xf0fb;</option>
                                        <option value="226">&#xf0fc;</option>
                                        <option value="227">&#xf0fd;</option>
                                        <option value="228">&#xf0fe;</option>
                                        <option value="229">&#xf100;</option>
                                        <option value="230">&#xf101;</option>
                                        <option value="231">&#xf102;</option>
                                        <option value="232">&#xf103;</option>
                                        <option value="233">&#xf104;</option>
                                        <option value="234">&#xf105;</option>
                                        <option value="235">&#xf106;</option>
                                        <option value="236">&#xf107;</option>
                                        <option value="237">&#xf108;</option>
                                        <option value="238">&#xf109;</option>
                                        <option value="239">&#xf10a;</option>
                                        <option value="240">&#xf10b;</option>
                                        <option value="241">&#xf10c;</option>
                                        <option value="242">&#xf10d;</option>
                                        <option value="243">&#xf10e;</option>
                                        <option value="244">&#xf110;</option>
                                        <option value="245">&#xf111;</option>
                                        <option value="246">&#xf112;</option>
                                        <option value="247">&#xf113;</option>
                                        <option value="248">&#xf114;</option>
                                        <option value="249">&#xf115;</option>
                                        <option value="250">&#xf118;</option>
                                        <option value="251">&#xf119;</option>
                                        <option value="252">&#xf11a;</option>
                                        <option value="253">&#xf11b;</option>
                                        <option value="254">&#xf11c;</option>
                                        <option value="255">&#xf11d;</option>
                                        <option value="256">&#xf11e;</option>
                                        <option value="257">&#xf120;</option>
                                        <option value="258">&#xf121;</option>
                                        <option value="259">&#xf122;</option>
                                        <option value="260">&#xf122;</option>
                                        <option value="261">&#xf123;</option>
                                        <option value="262">&#xf124;</option>
                                        <option value="263">&#xf125;</option>
                                        <option value="264">&#xf126;</option>
                                        <option value="265">&#xf127;</option>
                                        <option value="266">&#xf128;</option>
                                        <option value="267">&#xf129;</option>
                                        <option value="268">&#xf12a;</option>
                                        <option value="269">&#xf12b;</option>
                                        <option value="270">&#xf12c;</option>
                                        <option value="271">&#xf12d;</option>
                                        <option value="272">&#xf12e;</option>
                                        <option value="273">&#xf130;</option>
                                        <option value="274">&#xf131;</option>
                                        <option value="275">&#xf132;</option>
                                        <option value="276">&#xf133;</option>
                                        <option value="277">&#xf134;</option>
                                        <option value="278">&#xf135;</option>
                                        <option value="279">&#xf136;</option>
                                        <option value="280">&#xf137;</option>
                                        <option value="281">&#xf138;</option>
                                        <option value="282">&#xf139;</option>
                                        <option value="283">&#xf13a;</option>
                                        <option value="284">&#xf13b;</option>
                                        <option value="285">&#xf13c;</option>
                                        <option value="286">&#xf13d;</option>
                                        <option value="287">&#xf13e;</option>
                                        <option value="288">&#xf140;</option>
                                        <option value="289">&#xf141;</option>
                                        <option value="290">&#xf142;</option>
                                        <option value="291">&#xf143;</option>
                                        <option value="292">&#xf144;</option>
                                        <option value="293">&#xf145;</option>
                                        <option value="294">&#xf146;</option>
                                        <option value="295">&#xf147;</option>
                                        <option value="296">&#xf148;</option>
                                        <option value="297">&#xf149;</option>
                                        <option value="298">&#xf14a;</option>
                                        <option value="299">&#xf14b;</option>
                                        <option value="300">&#xf14c;</option>
                                        <option value="301">&#xf14d;</option>
                                        <option value="302">&#xf14e;</option>
                                        <option value="303">&#xf150;</option>
                                        <option value="304">&#xf151;</option>
                                        <option value="305">&#xf152;</option>
                                        <option value="306">&#xf153;</option>
                                        <option value="307">&#xf154;</option>
                                        <option value="308">&#xf155;</option>
                                        <option value="309">&#xf156;</option>
                                        <option value="310">&#xf157;</option>
                                        <option value="311">&#xf158;</option>
                                        <option value="312">&#xf159;</option>
                                        <option value="313">&#xf15a;</option>
                                        <option value="314">&#xf15b;</option>
                                        <option value="315">&#xf15c;</option>
                                        <option value="316">&#xf15d;</option>
                                        <option value="317">&#xf15e;</option>
                                        <option value="318">&#xf160;</option>
                                        <option value="319">&#xf161;</option>
                                        <option value="320">&#xf162;</option>
                                        <option value="321">&#xf163;</option>
                                        <option value="322">&#xf164;</option>
                                        <option value="323">&#xf165;</option>
                                        <option value="324">&#xf166;</option>
                                        <option value="325">&#xf167;</option>
                                        <option value="326">&#xf168;</option>
                                        <option value="327">&#xf169;</option>
                                        <option value="328">&#xf16a;</option>
                                        <option value="329">&#xf16b;</option>
                                        <option value="330">&#xf16c;</option>
                                        <option value="331">&#xf16d;</option>
                                        <option value="332">&#xf16e;</option>
                                        <option value="333">&#xf170;</option>
                                        <option value="334">&#xf171;</option>
                                        <option value="335">&#xf172;</option>
                                        <option value="336">&#xf173;</option>
                                        <option value="337">&#xf174;</option>
                                        <option value="338">&#xf175;</option>
                                        <option value="339">&#xf176;</option>
                                        <option value="340">&#xf177;</option>
                                        <option value="341">&#xf178;</option>
                                        <option value="342">&#xf179;</option>
                                        <option value="343">&#xf17a;</option>
                                        <option value="344">&#xf17b;</option>
                                        <option value="345">&#xf17c;</option>
                                        <option value="346">&#xf17d;</option>
                                        <option value="347">&#xf17e;</option>
                                        <option value="348">&#xf180;</option>
                                        <option value="349">&#xf181;</option>
                                        <option value="350">&#xf182;</option>
                                        <option value="351">&#xf183;</option>
                                        <option value="352">&#xf184;</option>
                                        <option value="353">&#xf185;</option>
                                        <option value="354">&#xf186;</option>
                                        <option value="355">&#xf187;</option>
                                        <option value="356">&#xf188;</option>
                                        <option value="357">&#xf189;</option>
                                        <option value="358">&#xf18a;</option>
                                        <option value="359">&#xf18b;</option>
                                        <option value="360">&#xf18c;</option>
                                        <option value="361">&#xf18d;</option>
                                        <option value="362">&#xf18e;</option>
                                        <option value="363">&#xf190;</option>
                                        <option value="364">&#xf191;</option>
                                        <option value="365">&#xf192;</option>
                                        <option value="366">&#xf193;</option>
                                        <option value="367">&#xf194;</option>
                                        <option value="368">&#xf195;</option>
                                        <option value="369">&#xf196;</option>
                                    </select>
                                    <label>Color</label>
                                    <input
                                        id="mapaw_color"
                                        class="mapaw_color color form-control"
                                        type="text"
                                        placeholder="Hex Color"
                                        value="#000"/>
                                    <label>Marker</label>
                                    <div class="marker-preview">
                                        <img data-id="1" class="selected" src="img/marker1.png" alt=""/>
                                        <img data-id="2" src="<?php echo curPageURL(); ?>/img/marker2.png" alt=""/>
                                        <img data-id="3" src="<?php echo curPageURL(); ?>/img/marker3.png" alt=""/>
                                        <img data-id="4" src="<?php echo curPageURL(); ?>/img/marker4.png" alt=""/>
                                        <img data-id="5" src="<?php echo curPageURL(); ?>/img/marker5.png" alt=""/>
                                        <img data-id="6" src="<?php echo curPageURL(); ?>/img/marker6.png" alt=""/>
                                    </div>
                                    <hr/>
                                    <label>Result</label>
                                    <div class="icon-preview col-md-12">
                                        <div class='pin_marker preview'></div>
                                    </div>
                                </fieldset>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary mapaw_submit">Go to Step 2 &rarr;</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->
        <script>
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                },
                i[r].l = 1 * new Date();
                a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m
                    .parentNode
                    .insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-37805539-15', 'axelhardy.com');
            ga('send', 'pageview');
        </script>
    </body>
</html>