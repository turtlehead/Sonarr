﻿using System.Collections.Generic;
using FluentValidation;
using NzbDrone.Core.Profiles.Delay;
using Sonarr.Http;
using Sonarr.Http.Mapping;
using Sonarr.Http.REST;
using Sonarr.Http.Validation;

namespace Sonarr.Api.V3.Profiles.Delay
{
    public class DelayProfileModule : SonarrRestModule<DelayProfileResource>
    {
        private readonly IDelayProfileService _delayProfileService;

        public DelayProfileModule(IDelayProfileService delayProfileService, DelayProfileTagInUseValidator tagInUseValidator)
        {
            _delayProfileService = delayProfileService;

            GetResourceAll = GetAll;
            GetResourceById = GetById;
            UpdateResource = Update;
            CreateResource = Create;
            DeleteResource = DeleteProfile;

            SharedValidator.RuleFor(d => d.Tags).NotEmpty().When(d => d.Id != 1);
            SharedValidator.RuleFor(d => d.Tags).EmptyCollection<DelayProfileResource, int>().When(d => d.Id == 1);
            SharedValidator.RuleFor(d => d.Tags).SetValidator(tagInUseValidator);
            SharedValidator.RuleFor(d => d.UsenetDelay).GreaterThanOrEqualTo(0);
            SharedValidator.RuleFor(d => d.TorrentDelay).GreaterThanOrEqualTo(0);
            SharedValidator.RuleFor(d => d.Id).SetValidator(new DelayProfileValidator());
        }

        private int Create(DelayProfileResource resource)
        {
            var model = resource.InjectTo<DelayProfile>();
            model = _delayProfileService.Add(model);

            return model.Id;
        }

        private void DeleteProfile(int id)
        {
            if (id == 1)
            {
                throw new MethodNotAllowedException("Cannot delete global delay profile");
            }

            _delayProfileService.Delete(id);
        }

        private void Update(DelayProfileResource resource)
        {
            GetNewId<DelayProfile>(_delayProfileService.Update, resource);
        }

        private DelayProfileResource GetById(int id)
        {
            return _delayProfileService.Get(id).InjectTo<DelayProfileResource>();
        }

        private List<DelayProfileResource> GetAll()
        {
            return _delayProfileService.All().InjectTo<List<DelayProfileResource>>();
        }
    }
}