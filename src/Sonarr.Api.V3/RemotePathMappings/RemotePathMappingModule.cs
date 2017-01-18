﻿using System.Collections.Generic;
using FluentValidation;
using NzbDrone.Core.RemotePathMappings;
using NzbDrone.Core.Validation.Paths;
using Omu.ValueInjecter;
using Sonarr.Http;
using Sonarr.Http.Mapping;

namespace Sonarr.Api.V3.RemotePathMappings
{
    public class RemotePathMappingModule : SonarrRestModule<RemotePathMappingResource>
    {
        private readonly IRemotePathMappingService _remotePathMappingService;

        public RemotePathMappingModule(IRemotePathMappingService remotePathMappingService,
                                       PathExistsValidator pathExistsValidator,
                                       MappedNetworkDriveValidator mappedNetworkDriveValidator)
        {
            _remotePathMappingService = remotePathMappingService;

            GetResourceAll = GetMappings;
            GetResourceById = GetMappingById;
            CreateResource = CreateMapping;
            DeleteResource = DeleteMapping;
            UpdateResource = UpdateMapping;

            SharedValidator.RuleFor(c => c.Host)
                           .NotEmpty();

            // We cannot use IsValidPath here, because it's a remote path, possibly other OS.
            SharedValidator.RuleFor(c => c.RemotePath)
                           .NotEmpty();

            SharedValidator.RuleFor(c => c.LocalPath)
                           .Cascade(CascadeMode.StopOnFirstFailure)
                           .IsValidPath()
                           .SetValidator(mappedNetworkDriveValidator)
                           .SetValidator(pathExistsValidator);
        }

        private RemotePathMappingResource GetMappingById(int id)
        {
            return _remotePathMappingService.Get(id).InjectTo<RemotePathMappingResource>();
        }

        private int CreateMapping(RemotePathMappingResource rootFolderResource)
        {
            return GetNewId<RemotePathMapping>(_remotePathMappingService.Add, rootFolderResource);
        }

        private List<RemotePathMappingResource> GetMappings()
        {
            return ToListResource(_remotePathMappingService.All);
        }

        private void DeleteMapping(int id)
        {
            _remotePathMappingService.Remove(id);
        }

        private void UpdateMapping(RemotePathMappingResource resource)
        {
            var mapping = _remotePathMappingService.Get(resource.Id);

            mapping.InjectFrom(resource);

            _remotePathMappingService.Update(mapping);
        }
    }
}