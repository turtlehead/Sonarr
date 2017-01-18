﻿using Nancy;
using Nancy.Routing;
using NzbDrone.Common.EnvironmentInfo;
using NzbDrone.Common.Extensions;
using NzbDrone.Core.Configuration;
using NzbDrone.Core.Datastore;
using NzbDrone.Core.Lifecycle;
using Sonarr.Http.Extensions;

namespace Sonarr.Api.V3.System
{
    public class SystemModule : SonarrV3Module
    {
        private readonly IAppFolderInfo _appFolderInfo;
        private readonly IRuntimeInfo _runtimeInfo;
        private readonly IRouteCacheProvider _routeCacheProvider;
        private readonly IConfigFileProvider _configFileProvider;
        private readonly IMainDatabase _database;
        private readonly ILifecycleService _lifecycleService;

        public SystemModule(IAppFolderInfo appFolderInfo,
                            IRuntimeInfo runtimeInfo,
                            IRouteCacheProvider routeCacheProvider,
                            IConfigFileProvider configFileProvider,
                            IMainDatabase database,
                            ILifecycleService lifecycleService)
            : base("system")
        {
            _appFolderInfo = appFolderInfo;
            _runtimeInfo = runtimeInfo;
            _routeCacheProvider = routeCacheProvider;
            _configFileProvider = configFileProvider;
            _database = database;
            _lifecycleService = lifecycleService;
            Get["/status"] = x => GetStatus();
            Get["/routes"] = x => GetRoutes();
            Post["/shutdown"] = x => Shutdown();
            Post["/restart"] = x => Restart();
        }

        private Response GetStatus()
        {
            return new
                {
                    Version = BuildInfo.Version.ToString(),
                    BuildTime = BuildInfo.BuildDateTime,
                    IsDebug = BuildInfo.IsDebug,
                    IsProduction = RuntimeInfoBase.IsProduction,
                    IsAdmin = _runtimeInfo.IsAdmin,
                    IsUserInteractive = RuntimeInfoBase.IsUserInteractive,
                    StartupPath = _appFolderInfo.StartUpFolder,
                    AppData = _appFolderInfo.GetAppDataPath(),
                    OsVersion = OsInfo.Version.ToString(),
                    IsMonoRuntime = OsInfo.IsMonoRuntime,
                    IsMono = OsInfo.IsNotWindows,
                    IsLinux = OsInfo.IsLinux,
                    IsOsx = OsInfo.IsOsx,
                    IsWindows = OsInfo.IsWindows,
                    Branch = _configFileProvider.Branch,
                    Authentication = _configFileProvider.AuthenticationMethod,
                    SqliteVersion = _database.Version,
                    UrlBase = _configFileProvider.UrlBase,
                    RuntimeVersion = _runtimeInfo.RuntimeVersion,
                    StartTime = _runtimeInfo.StartTime,
                    Mode = _runtimeInfo.Mode
            }.AsResponse();
        }

        private Response GetRoutes()
        {
            return _routeCacheProvider.GetCache().Values.AsResponse();
        }

        private Response Shutdown()
        {
            _lifecycleService.Shutdown();
            return "".AsResponse();
        }

        private Response Restart()
        {
            _lifecycleService.Restart();
            return "".AsResponse();
        }
    }
}
