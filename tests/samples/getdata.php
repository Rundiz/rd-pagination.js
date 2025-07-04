<?php
/**
 * Get dummy data. Accepted query string: `page`, `offset`.
 */


header('content-type: application/json');


$output = [];
$output['itemsPerPage'] = 10;
$output['totalItems'] = 195;
$output['maxPages'] = intval(ceil($output['totalItems'] / $output['itemsPerPage']));

// page number and offset. -------------------------
$page = filter_input(INPUT_GET, 'page', FILTER_SANITIZE_NUMBER_INT);
if (!is_numeric($page)) {
    $page = null;
} else {
    if ($page <= 0) {
        $page = 1;
    }
    $page = intval($page);
}
if (isset($page) && $page > $output['maxPages']) {
    $page = $output['maxPages'];
}
$output['page'] = $page;// this output is nullable.
$offset = filter_input(INPUT_GET, 'offset', FILTER_SANITIZE_NUMBER_INT);
if (!is_numeric($offset)) {
    $offset = intval((($page ?? 0) - 1) * $output['itemsPerPage']);
} else {
    $offset = intval($offset);
}
if ($offset < 0) {
    $offset = 0;
}
if ($offset >= $output['totalItems']) {
    $offset = ($output['totalItems'] - 1);
}
$output['offset'] = $offset;
unset($offset, $page);
// end page number and offset. ---------------------

// get data sliced by items per page. --------------
$totalItems = [];
for ($i = 1; $i <= $output['totalItems']; ++$i) {
    $totalItems[] = $i;
}
$output['items'] = array_slice($totalItems, $output['offset'], $output['itemsPerPage']);
// end get data sliced by items per page. ----------


// response and end. ===============================================
echo json_encode($output);
unset($output);
exit();