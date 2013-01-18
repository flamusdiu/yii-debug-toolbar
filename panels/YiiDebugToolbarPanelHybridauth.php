<?php
/**
 * YiiDebugToolbarPanelHybridauth class file.
 *
 * @author Jesse Spangenberger <azulephoenix@gmail.com>
 */


/**
 * YiiDebugToolbarPanelHybridauth represents an YiiDebugToolbarPanel
 *
 * Shows the Yii extension Hybridauth on the Yii Debug Toolbar
 *
 * @author Jesse Spangenberger <azulephoenix@gmail.com>
 * @version $Id$
 * @package YiiDebugToolbar
 * @since 1.1.7
 * @see YiiDebugToolbarPanel
 */
class YiiDebugToolbarPanelHybridauth extends YiiDebugToolbarPanel
{
    /**
     * Message count.
     *
     * @var integer
     */
    private $_countMessages;

    /**
     * Logs.
     *
     * @var array
     */
    private $_logs;

    /**
     * {@inheritdoc}
     */
    public function getMenuTitle()
    {
        return YiiDebug::t('Hybridauth');
    }

    /**
     * {@inheritdoc}
     */
    public function getMenuSubTitle()
    {
        return YiiDebug::t('{n} message|{n} messages', array($this->countMessages));
    }

    /**
     * {@inheritdoc}
     */
    public function getTitle()
    {
        return YiiDebug::t('Hybridauth Logging');
    }

    /**
     * Get logs.
     *
     * @return array
     */
    public function getLogs()
    {
        if (null === $this->_logs)
        {
            $this->_logs = $this->filterLogs();
        }
        return $this->_logs;
    }

    /**
     * Get count of messages.
     *
     * @return integer
     */
    public function getCountMessages()
    {
        if (null === $this->_countMessages)
        {
            $this->_countMessages = count($this->logs);
        }
        return $this->_countMessages;
    }

    /**
     * {@inheritdoc}
     */
    public function run()
    {
        $this->render('hybridauth', array(
            'logs' => $this->logs
        ));
    }

    /**
     * Get filter logs.
     *
     * @return array
     */
    protected function filterLogs()
    {
        $logs = array();
        foreach ($this->owner->getLogs() as $entry)
        {
            if ($entry[2] == 'system.CModule.hybridauth')
            {
                $logs[] = $entry;
            }
        }
        return $logs;
    }
}
