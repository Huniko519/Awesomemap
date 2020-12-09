-- --------------------------------------------------------

--
-- Table `map_infos`
--

CREATE TABLE IF NOT EXISTS `map_infos` (
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `zoom` int(11) DEFAULT NULL,
  `cluster` int(11) DEFAULT NULL,
  `search` int(11) DEFAULT NULL,
  `theme` varchar(60) NOT NULL,
  UNIQUE KEY `lat` (`lat`,`lng`,`zoom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table `markers`
--

CREATE TABLE IF NOT EXISTS `markers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `desc` text NOT NULL,
  `lat` varchar(50) NOT NULL DEFAULT '',
  `lng` varchar(50) NOT NULL DEFAULT '',
  `address` text NOT NULL,
  `content` text,
  `icon` varchar(50) DEFAULT NULL,
  `icon_color` varchar(6) DEFAULT NULL,
  `marker` int(11) DEFAULT NULL,
  `preview` varchar(10) DEFAULT NULL,
  `oi_preview` varchar(10) DEFAULT NULL,
  `sv_url` varchar(255) DEFAULT NULL,
  `unique_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0 ;

-- --------------------------------------------------------

--
-- Table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0 ;
