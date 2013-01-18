<table id="yii-debug-toolbar-hybridauth">
    <thead>
        <tr>
            <th class="collapsible collapsed al-l" rel="#yii-debug-toolbar-log .details">
                <?php echo YiiDebug::t('Message (details)')?></th>
            <th nowrap="nowrap"><?php echo YiiDebug::t('Level')?></th>
            <th nowrap="nowrap" class="al-l"><?php echo YiiDebug::t('Category')?></th>
            <th nowrap="nowrap"><?php echo YiiDebug::t('Time')?></th>
        </tr>
    </thead>
    <tbody>
    <?php foreach($logs as $id=>$entry): ?>
        <tr class="<?php echo ($id%2?'odd':'even') ?>">
            <td width="100%" onclick="jQuery('.details', this).toggleClass('hidden');">
                <?php echo YiiDebugViewHelper::splitLinesInBlocks($entry[0]) ?></td>
            <td nowrap="nowrap" class="al-c"><?php echo $entry[1]?></td>
            <td nowrap="nowrap"><?php echo $entry[2] ?></td>
            <td nowrap="nowrap" class="al-c"><?php echo date('H:i:s.',$entry[3]).sprintf('%06d',(int)(($entry[3]-(int)$entry[3])*1000000));?></td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>