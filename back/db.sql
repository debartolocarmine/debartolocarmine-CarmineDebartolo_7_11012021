-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : sql217.your-server.de
-- Généré le : dim. 14 nov. 2021 à 02:19
-- Version du serveur : 5.7.35-1
-- Version de PHP : 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `code_cdb_2958`
--

-- --------------------------------------------------------

--
-- Structure de la table `billet_de_revue`
--

CREATE TABLE `billet_de_revue` (
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `artwork` text COLLATE utf8mb4_unicode_ci,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uid` int(11) NOT NULL,
  `video` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `billet_de_revue`
--

INSERT INTO `billet_de_revue` (`bid`, `titre`, `description`, `artwork`, `created`, `updated`, `uid`, `video`, `path`) VALUES
(221, 'Premier billet', NULL, NULL, '2021-11-14 02:10:25', '2021-11-14 02:10:25', 5, NULL, 'premier-billet');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `icon` text COLLATE utf8mb4_unicode_ci,
  `path` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`cid`, `nom`, `description`, `icon`, `path`) VALUES
(1, 'ReactJs', NULL, NULL, ''),
(2, 'AngularJs', NULL, NULL, ''),
(3, 'ViewJs', NULL, NULL, ''),
(4, 'NodeJs', NULL, NULL, ''),
(5, 'Docker', NULL, NULL, ''),
(6, 'Ajax', NULL, NULL, ''),
(7, 'js', NULL, NULL, ''),
(8, 'backbones', NULL, NULL, ''),
(9, 'JSON', NULL, NULL, ''),
(10, 'Drupal 7', '', NULL, ''),
(11, 'Linux', NULL, NULL, ''),
(12, 'Bash', NULL, NULL, ''),
(13, 'Mysql', NULL, NULL, ''),
(14, 'Postgres', NULL, NULL, ''),
(15, 'Jquery', NULL, NULL, ''),
(16, 'Vagrant', NULL, NULL, ''),
(17, 'Adobe InDesign', NULL, NULL, ''),
(18, 'Adobe Photoshop', NULL, NULL, ''),
(19, 'Adobe Premiere', NULL, NULL, ''),
(20, 'Adobe Illustrator', NULL, NULL, '');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `lid` int(11) NOT NULL AUTO_INCREMENT,
  `bid` int(11) NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reactions`
--

CREATE TABLE `reactions` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `bid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `reactions`
--

INSERT INTO `reactions` (`rid`, `description`, `bid`, `uid`, `created`, `updated`) VALUES
(40, 'The Force is strong with this one. ', 217, 5, '2021-11-14 00:15:52', '2021-11-14 00:15:52'),
(41, 'I have you now. The Force is strong with this one.', 217, 5, '2021-11-14 00:16:05', '2021-11-14 00:16:05'),
(42, ' I have you now. Oh God, my uncle. ', 217, 5, '2021-11-14 00:16:12', '2021-11-14 00:16:12'),
(43, 'How am I ever gonna explain this? I need your help, Luke. ', 217, 5, '2021-11-14 00:16:19', '2021-11-14 00:16:19'),
(44, 'She needs your help. I m getting too old for this sort of thing.', 217, 5, '2021-11-14 00:16:24', '2021-11-14 00:16:24');

-- --------------------------------------------------------

--
-- Structure de la table `revue_categories`
--

CREATE TABLE `revue_categories` (
  `rcid` int(11) NOT NULL AUTO_INCREMENT,
  `bid` int(11) NOT NULL,
  `cid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `username` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `nom` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prenom` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `biographie` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `portrait` text COLLATE utf8mb4_unicode_ci,
  `roles` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'runner',
  `status` int(2) DEFAULT '1',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`uid`, `username`, `email`, `password`, `nom`, `prenom`, `biographie`, `portrait`, `roles`, `status`, `created`) VALUES
(1, 'administration', 'VnuLWKQmf/Hd5ON+vrvJLvLui1wnhElDBTCAHu5QMBRcJORzsWRJmsv08brRSKnwPCCspkebqLPlzEa/qB/SYQ==', '$2b$10$AHv1Jx1SNi0m6J1iEtFbouThMkIUgQhdjy.NoNOb/7aZ6WWDmqgrO', 'Administration', 'Mr', 'You mean it controls your actions? I need your help, Luke. She needs your help. I\'m getting too old for this sort of thing. Ye-ha! All right. Well, take care of yourself, Han. I guess that\'s what you\'re best at, ain\'t it?  Leave that to me. Send a distress signal, and inform the Senate that all on board were killed. Kid, I\'ve flown from one side of this galaxy to the other. I\'ve seen a lot of strange stuff, but I\'ve never seen anything to make me believe there\'s one all-powerful Force controlling everything. There\'s no mystical energy field that controls my destiny. It\'s all a lot of simple tricks and nonsense.', 'portrait-oreille.png', 'admin', 1, '2011-11-14 01:57:01'),
(5, 'pierre-bezoukow', 'XyWIRUOUzloMyLz9PlhzlDsKuT/xo9OJRuVyiYdLmNqOvohaZy/5yTiaENgL5Fl/+y5hhJGqbmMCdNeoTDxwZA==', '$2b$10$NnLdArhTIUcQLmkJiVC9WOxBY52qO/uJL/ooY7mDBNvrJaqlvaqCe', 'Bezoukow', 'Pierre', 'Escape is not his plan. I must face him, alone. You mean it controls your actions? Don\'t act so surprised, Your Highness. You weren\'t on any mercy mission this time. Several transmissions were beamed to this ship by Rebel spies. I want to know what happened to the plans they sent you.  I call it luck. Don\'t act so surprised, Your Highness. You weren\'t on any mercy mission this time. Several transmissions were beamed to this ship by Rebel spies. I want to know what happened to the plans they sent you.', 'portrait-oreille.png', 'runner', 1, '2020-11-14 01:57:01'),
(6, 'constantin-levine', 'iXBGSQCI89BarZOXigJ+HsC02yDbx1udD6oxSP/fWNpQI5PRgUk5oa7DQYBQ5/xoVAH1TIAD3tWzz0n57YZGuA==', '$2b$10$SDEPNGnuZVgfq3bg8.RQfuZfjZ5jxbTjAGGfOSP1hNA.O/itxqL3m', 'Levine', 'Constantin', 'But with the blast shield down, I can\'t even see! How am I supposed to fight? But with the blast shield down, I can\'t even see! How am I supposed to fight? Alderaan? I\'m not going to Alderaan. I\'ve got to go home. It\'s late, I\'m in for it as it is.  The more you tighten your grip, Tarkin, the more star systems will slip through your fingers. All right. Well, take care of yourself, Han. I guess that\'s what you\'re best at, ain\'t it? Look, I ain\'t in this for your revolution, and I\'m not in it for you, Princess. I expect to be well paid. I\'m in it for the money.', NULL, 'runner', 1, '2021-11-14 02:01:44'),
(7, 'andre-boltansky', '5SN3dGfI7VrudnLLKWgHdiQMJOTyEhLNFzOBaSLOngcKw45vMix9PMQI9XClJzYmH0eYljMb0vLi9rvHasgJ7g==', '$2b$10$X5MBv/kRZ8NG73ZBaxH08.PJWX3Qu/2pUF7JfmpSWv1b6CYATc/rC', 'Boltansky', 'André', 'In my experience, there is no such thing as luck. Alderaan? I\'m not going to Alderaan. I\'ve got to go home. It\'s late, I\'m in for it as it is. All right. Well, take care of yourself, Han. I guess that\'s what you\'re best at, ain\'t it?  What good is a reward if you ain\'t around to use it? Besides, attacking that battle station ain\'t my idea of courage. It\'s more like…suicide. You\'re all clear, kid. Let\'s blow this thing and go home!', NULL, 'runner', 1, '2021-11-14 02:02:53');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `billet_de_revue`
--
ALTER TABLE `billet_de_revue`
  ADD PRIMARY KEY (`bid`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cid`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`lid`);

--
-- Index pour la table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`rid`);

--
-- Index pour la table `revue_categories`
--
ALTER TABLE `revue_categories`
  ADD PRIMARY KEY (`rcid`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD UNIQUE KEY `unique_username` (`username`);