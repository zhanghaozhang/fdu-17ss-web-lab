<?php
include 'travel-data.inc.php';




?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Chapter 12</title>

      <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="css/bootstrap.min.css" />
    
    
    <link rel="stylesheet" href="css/bootstrap-theme.css" />
    <link rel="stylesheet" href="css/captions.css" />

</head>

<body>
    <?php include 'header.inc.php'; ?>
    


    <!-- Page Content -->
    <main class="container">
     
        
        <div class="btn-group countryButtons" role="group" aria-label="...">
              <a role="button" class="btn btn-default" href="list.php">All</a>
           
              <?php
              $number = ["CA", "DE", "GR", "IT", "GB", "US"];
              for ($i = 0; $i < count($number); $i++){
                  $iron = '<a href="list.php?country=Canada" role="button" class="btn btn-default">'. $countries[$number[$i]] . '</a>';
                  echo $iron;
              }
              /* you will need to fill this place with appropriate PHP */
              /* hint: use array and loop */
              //the next line is an example
              //<a href="list.php?country=Canada" role="button" class="btn btn-default"> Canada</a>
              ?>
        </div>


        <ul class="caption-style-2">
            <?php
            /* you will need to fill this place with appropriate PHP */
            /* hint: use array and loop */
            //the next lines are one of the elements
            //you need to fill the elements with data provided

//            $number = ["22", "54", "7", "19", "46", "6", "60", "58", "75", "77", "27", "2", "24",
//                "13", "101", "102"];
//            for ($i = 0; $i < count($number); $i++) {
//                    $iron = '<li>
//                                <a href="detail.php? id=" ' . $images[$number[$i]]["id"] . ' class=" img-responsive">
//                 	                <img src="images/square/' . $images[$number[$i]]["path"] . '" alt=" ' . $images[$number[$i]]["title"] . ' ">
//                 	                <div class="caption">
//                 		             <div class="blur">
//                 		                </div>
//                 		                <div class="caption-text">
//                 			              <h1>' . $images[$number[$i]]["title"] . '</h1>
//                 		                </div>
//                 	                </div>
//                                </a>
//			                </li>';
//                    echo $iron;
//            }
//
            foreach($images as $image) {
                $postId = $image["id"];
                $postPath = $image["path"];
                $postTitle = $image["title"];
                $iron = '<li>
                                <a href="detail.php? id=" ' . $postId . ' class=" img-responsive">
                 	                <img src="images/square/' . $postPath . '" alt=" ' . $postTitle . ' ">
                 	                <div class="caption">
                 		             <div class="blur">
                 		                </div>
                 		                <div class="caption-text">
                 			              <h1>' . $postTitle . '</h1>
                 		                </div>
                 	                </div>
                                </a>
			                </li>';
                echo $iron;
            }
            ?>

        </ul>


    </main>
    
    <footer>
        <div class="container-fluid">
                    <div class="row final">
                <p>Copyright &copy; 2017 Creative Commons ShareAlike</p>
                <p><a href="#">Home</a> / <a href="#">About</a> / <a href="#">Contact</a> / <a href="#">Browse</a></p>
            </div>            
        </div>
        

    </footer>


        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
</body>

</html>