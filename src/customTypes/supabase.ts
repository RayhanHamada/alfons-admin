/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/': {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  '/admin': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.admin.id'];
          supabase_user_id?: parameters['rowFilter.admin.supabase_user_id'];
          name?: parameters['rowFilter.admin.name'];
          phone_number?: parameters['rowFilter.admin.phone_number'];
          otp?: parameters['rowFilter.admin.otp'];
          created_at?: parameters['rowFilter.admin.created_at'];
          updated_at?: parameters['rowFilter.admin.updated_at'];
          cabang_id?: parameters['rowFilter.admin.cabang_id'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['admin'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** admin */
          admin?: definitions['admin'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.admin.id'];
          supabase_user_id?: parameters['rowFilter.admin.supabase_user_id'];
          name?: parameters['rowFilter.admin.name'];
          phone_number?: parameters['rowFilter.admin.phone_number'];
          otp?: parameters['rowFilter.admin.otp'];
          created_at?: parameters['rowFilter.admin.created_at'];
          updated_at?: parameters['rowFilter.admin.updated_at'];
          cabang_id?: parameters['rowFilter.admin.cabang_id'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.admin.id'];
          supabase_user_id?: parameters['rowFilter.admin.supabase_user_id'];
          name?: parameters['rowFilter.admin.name'];
          phone_number?: parameters['rowFilter.admin.phone_number'];
          otp?: parameters['rowFilter.admin.otp'];
          created_at?: parameters['rowFilter.admin.created_at'];
          updated_at?: parameters['rowFilter.admin.updated_at'];
          cabang_id?: parameters['rowFilter.admin.cabang_id'];
        };
        body: {
          /** admin */
          admin?: definitions['admin'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  '/appointment': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.appointment.id'];
          date?: parameters['rowFilter.appointment.date'];
          cancel?: parameters['rowFilter.appointment.cancel'];
          done?: parameters['rowFilter.appointment.done'];
          note?: parameters['rowFilter.appointment.note'];
          created_at?: parameters['rowFilter.appointment.created_at'];
          updated_at?: parameters['rowFilter.appointment.updated_at'];
          cabang_id?: parameters['rowFilter.appointment.cabang_id'];
          klien_id?: parameters['rowFilter.appointment.klien_id'];
          stylish_id?: parameters['rowFilter.appointment.stylish_id'];
          jam_id?: parameters['rowFilter.appointment.jam_id'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['appointment'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** appointment */
          appointment?: definitions['appointment'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.appointment.id'];
          date?: parameters['rowFilter.appointment.date'];
          cancel?: parameters['rowFilter.appointment.cancel'];
          done?: parameters['rowFilter.appointment.done'];
          note?: parameters['rowFilter.appointment.note'];
          created_at?: parameters['rowFilter.appointment.created_at'];
          updated_at?: parameters['rowFilter.appointment.updated_at'];
          cabang_id?: parameters['rowFilter.appointment.cabang_id'];
          klien_id?: parameters['rowFilter.appointment.klien_id'];
          stylish_id?: parameters['rowFilter.appointment.stylish_id'];
          jam_id?: parameters['rowFilter.appointment.jam_id'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.appointment.id'];
          date?: parameters['rowFilter.appointment.date'];
          cancel?: parameters['rowFilter.appointment.cancel'];
          done?: parameters['rowFilter.appointment.done'];
          note?: parameters['rowFilter.appointment.note'];
          created_at?: parameters['rowFilter.appointment.created_at'];
          updated_at?: parameters['rowFilter.appointment.updated_at'];
          cabang_id?: parameters['rowFilter.appointment.cabang_id'];
          klien_id?: parameters['rowFilter.appointment.klien_id'];
          stylish_id?: parameters['rowFilter.appointment.stylish_id'];
          jam_id?: parameters['rowFilter.appointment.jam_id'];
        };
        body: {
          /** appointment */
          appointment?: definitions['appointment'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  '/cabang': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.cabang.id'];
          name?: parameters['rowFilter.cabang.name'];
          created_at?: parameters['rowFilter.cabang.created_at'];
          updated_at?: parameters['rowFilter.cabang.updated_at'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['cabang'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** cabang */
          cabang?: definitions['cabang'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.cabang.id'];
          name?: parameters['rowFilter.cabang.name'];
          created_at?: parameters['rowFilter.cabang.created_at'];
          updated_at?: parameters['rowFilter.cabang.updated_at'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.cabang.id'];
          name?: parameters['rowFilter.cabang.name'];
          created_at?: parameters['rowFilter.cabang.created_at'];
          updated_at?: parameters['rowFilter.cabang.updated_at'];
        };
        body: {
          /** cabang */
          cabang?: definitions['cabang'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  '/jam': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.jam.id'];
          jam_ke?: parameters['rowFilter.jam.jam_ke'];
          pukul?: parameters['rowFilter.jam.pukul'];
          created_at?: parameters['rowFilter.jam.created_at'];
          updated_at?: parameters['rowFilter.jam.updated_at'];
          cabang_id?: parameters['rowFilter.jam.cabang_id'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['jam'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** jam */
          jam?: definitions['jam'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.jam.id'];
          jam_ke?: parameters['rowFilter.jam.jam_ke'];
          pukul?: parameters['rowFilter.jam.pukul'];
          created_at?: parameters['rowFilter.jam.created_at'];
          updated_at?: parameters['rowFilter.jam.updated_at'];
          cabang_id?: parameters['rowFilter.jam.cabang_id'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.jam.id'];
          jam_ke?: parameters['rowFilter.jam.jam_ke'];
          pukul?: parameters['rowFilter.jam.pukul'];
          created_at?: parameters['rowFilter.jam.created_at'];
          updated_at?: parameters['rowFilter.jam.updated_at'];
          cabang_id?: parameters['rowFilter.jam.cabang_id'];
        };
        body: {
          /** jam */
          jam?: definitions['jam'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  '/klien': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.klien.id'];
          name?: parameters['rowFilter.klien.name'];
          jenis_kelamin?: parameters['rowFilter.klien.jenis_kelamin'];
          phone_number?: parameters['rowFilter.klien.phone_number'];
          phone_verified?: parameters['rowFilter.klien.phone_verified'];
          otp?: parameters['rowFilter.klien.otp'];
          created_at?: parameters['rowFilter.klien.created_at'];
          updated_at?: parameters['rowFilter.klien.updated_at'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['klien'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** klien */
          klien?: definitions['klien'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.klien.id'];
          name?: parameters['rowFilter.klien.name'];
          jenis_kelamin?: parameters['rowFilter.klien.jenis_kelamin'];
          phone_number?: parameters['rowFilter.klien.phone_number'];
          phone_verified?: parameters['rowFilter.klien.phone_verified'];
          otp?: parameters['rowFilter.klien.otp'];
          created_at?: parameters['rowFilter.klien.created_at'];
          updated_at?: parameters['rowFilter.klien.updated_at'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.klien.id'];
          name?: parameters['rowFilter.klien.name'];
          jenis_kelamin?: parameters['rowFilter.klien.jenis_kelamin'];
          phone_number?: parameters['rowFilter.klien.phone_number'];
          phone_verified?: parameters['rowFilter.klien.phone_verified'];
          otp?: parameters['rowFilter.klien.otp'];
          created_at?: parameters['rowFilter.klien.created_at'];
          updated_at?: parameters['rowFilter.klien.updated_at'];
        };
        body: {
          /** klien */
          klien?: definitions['klien'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  '/rendered_service': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.rendered_service.id'];
          service_id?: parameters['rowFilter.rendered_service.service_id'];
          appointment_id?: parameters['rowFilter.rendered_service.appointment_id'];
          created_at?: parameters['rowFilter.rendered_service.created_at'];
          updated_at?: parameters['rowFilter.rendered_service.updated_at'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['rendered_service'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** rendered_service */
          rendered_service?: definitions['rendered_service'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.rendered_service.id'];
          service_id?: parameters['rowFilter.rendered_service.service_id'];
          appointment_id?: parameters['rowFilter.rendered_service.appointment_id'];
          created_at?: parameters['rowFilter.rendered_service.created_at'];
          updated_at?: parameters['rowFilter.rendered_service.updated_at'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.rendered_service.id'];
          service_id?: parameters['rowFilter.rendered_service.service_id'];
          appointment_id?: parameters['rowFilter.rendered_service.appointment_id'];
          created_at?: parameters['rowFilter.rendered_service.created_at'];
          updated_at?: parameters['rowFilter.rendered_service.updated_at'];
        };
        body: {
          /** rendered_service */
          rendered_service?: definitions['rendered_service'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  '/service': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.service.id'];
          name?: parameters['rowFilter.service.name'];
          cost_estimate?: parameters['rowFilter.service.cost_estimate'];
          created_at?: parameters['rowFilter.service.created_at'];
          updated_at?: parameters['rowFilter.service.updated_at'];
          service_category_id?: parameters['rowFilter.service.service_category_id'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['service'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** service */
          service?: definitions['service'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.service.id'];
          name?: parameters['rowFilter.service.name'];
          cost_estimate?: parameters['rowFilter.service.cost_estimate'];
          created_at?: parameters['rowFilter.service.created_at'];
          updated_at?: parameters['rowFilter.service.updated_at'];
          service_category_id?: parameters['rowFilter.service.service_category_id'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.service.id'];
          name?: parameters['rowFilter.service.name'];
          cost_estimate?: parameters['rowFilter.service.cost_estimate'];
          created_at?: parameters['rowFilter.service.created_at'];
          updated_at?: parameters['rowFilter.service.updated_at'];
          service_category_id?: parameters['rowFilter.service.service_category_id'];
        };
        body: {
          /** service */
          service?: definitions['service'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  '/service_category': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.service_category.id'];
          name?: parameters['rowFilter.service_category.name'];
          created_at?: parameters['rowFilter.service_category.created_at'];
          updated_at?: parameters['rowFilter.service_category.updated_at'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['service_category'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** service_category */
          service_category?: definitions['service_category'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.service_category.id'];
          name?: parameters['rowFilter.service_category.name'];
          created_at?: parameters['rowFilter.service_category.created_at'];
          updated_at?: parameters['rowFilter.service_category.updated_at'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.service_category.id'];
          name?: parameters['rowFilter.service_category.name'];
          created_at?: parameters['rowFilter.service_category.created_at'];
          updated_at?: parameters['rowFilter.service_category.updated_at'];
        };
        body: {
          /** service_category */
          service_category?: definitions['service_category'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  '/stylish': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.stylish.id'];
          name?: parameters['rowFilter.stylish.name'];
          phone_number?: parameters['rowFilter.stylish.phone_number'];
          senin_available?: parameters['rowFilter.stylish.senin_available'];
          selasa_available?: parameters['rowFilter.stylish.selasa_available'];
          rabu_available?: parameters['rowFilter.stylish.rabu_available'];
          kamis_available?: parameters['rowFilter.stylish.kamis_available'];
          jumat_available?: parameters['rowFilter.stylish.jumat_available'];
          sabtu_available?: parameters['rowFilter.stylish.sabtu_available'];
          minggu_available?: parameters['rowFilter.stylish.minggu_available'];
          created_at?: parameters['rowFilter.stylish.created_at'];
          updated_at?: parameters['rowFilter.stylish.updated_at'];
          cabang_id?: parameters['rowFilter.stylish.cabang_id'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['stylish'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** stylish */
          stylish?: definitions['stylish'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.stylish.id'];
          name?: parameters['rowFilter.stylish.name'];
          phone_number?: parameters['rowFilter.stylish.phone_number'];
          senin_available?: parameters['rowFilter.stylish.senin_available'];
          selasa_available?: parameters['rowFilter.stylish.selasa_available'];
          rabu_available?: parameters['rowFilter.stylish.rabu_available'];
          kamis_available?: parameters['rowFilter.stylish.kamis_available'];
          jumat_available?: parameters['rowFilter.stylish.jumat_available'];
          sabtu_available?: parameters['rowFilter.stylish.sabtu_available'];
          minggu_available?: parameters['rowFilter.stylish.minggu_available'];
          created_at?: parameters['rowFilter.stylish.created_at'];
          updated_at?: parameters['rowFilter.stylish.updated_at'];
          cabang_id?: parameters['rowFilter.stylish.cabang_id'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.stylish.id'];
          name?: parameters['rowFilter.stylish.name'];
          phone_number?: parameters['rowFilter.stylish.phone_number'];
          senin_available?: parameters['rowFilter.stylish.senin_available'];
          selasa_available?: parameters['rowFilter.stylish.selasa_available'];
          rabu_available?: parameters['rowFilter.stylish.rabu_available'];
          kamis_available?: parameters['rowFilter.stylish.kamis_available'];
          jumat_available?: parameters['rowFilter.stylish.jumat_available'];
          sabtu_available?: parameters['rowFilter.stylish.sabtu_available'];
          minggu_available?: parameters['rowFilter.stylish.minggu_available'];
          created_at?: parameters['rowFilter.stylish.created_at'];
          updated_at?: parameters['rowFilter.stylish.updated_at'];
          cabang_id?: parameters['rowFilter.stylish.cabang_id'];
        };
        body: {
          /** stylish */
          stylish?: definitions['stylish'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  admin: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    supabase_user_id: string;
    name: string;
    phone_number: string;
    otp?: string;
    created_at?: string;
    updated_at?: string;
    /**
     * Note:
     * This is a Foreign Key to `cabang.id`.<fk table='cabang' column='id'/>
     */
    cabang_id: number;
  };
  appointment: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    date: string;
    cancel?: boolean;
    done?: boolean;
    note?: string;
    created_at?: string;
    updated_at?: string;
    /**
     * Note:
     * This is a Foreign Key to `cabang.id`.<fk table='cabang' column='id'/>
     */
    cabang_id: number;
    /**
     * Note:
     * This is a Foreign Key to `klien.id`.<fk table='klien' column='id'/>
     */
    klien_id: number;
    /**
     * Note:
     * This is a Foreign Key to `stylish.id`.<fk table='stylish' column='id'/>
     */
    stylish_id: number;
    /**
     * Note:
     * This is a Foreign Key to `jam.id`.<fk table='jam' column='id'/>
     */
    jam_id: number;
  };
  cabang: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
  };
  jam: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    jam_ke: number;
    pukul: string;
    created_at?: string;
    updated_at?: string;
    /**
     * Note:
     * This is a Foreign Key to `cabang.id`.<fk table='cabang' column='id'/>
     */
    cabang_id: number;
  };
  klien: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    name: string;
    jenis_kelamin: 'PRIA' | 'WANITA';
    phone_number: string;
    phone_verified?: boolean;
    otp?: string;
    created_at?: string;
    updated_at?: string;
  };
  rendered_service: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /**
     * Note:
     * This is a Foreign Key to `service.id`.<fk table='service' column='id'/>
     */
    service_id: number;
    /**
     * Note:
     * This is a Foreign Key to `appointment.id`.<fk table='appointment' column='id'/>
     */
    appointment_id: number;
    created_at?: string;
    updated_at?: string;
  };
  service: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    name: string;
    cost_estimate: number;
    created_at?: string;
    updated_at?: string;
    /**
     * Note:
     * This is a Foreign Key to `service_category.id`.<fk table='service_category' column='id'/>
     */
    service_category_id: number;
  };
  service_category: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
  };
  stylish: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    name: string;
    phone_number: string;
    senin_available: boolean;
    selasa_available: boolean;
    rabu_available: boolean;
    kamis_available: boolean;
    jumat_available: boolean;
    sabtu_available: boolean;
    minggu_available: boolean;
    created_at?: string;
    updated_at?: string;
    /**
     * Note:
     * This is a Foreign Key to `cabang.id`.<fk table='cabang' column='id'/>
     */
    cabang_id: number;
  };
}

export interface parameters {
  /** Preference */
  preferParams: 'params=single-object';
  /** Preference */
  preferReturn: 'return=representation' | 'return=minimal' | 'return=none';
  /** Preference */
  preferCount: 'count=none';
  /** Filtering Columns */
  select: string;
  /** On Conflict */
  on_conflict: string;
  /** Ordering */
  order: string;
  /** Limiting and Pagination */
  range: string;
  /** Limiting and Pagination */
  rangeUnit: string;
  /** Limiting and Pagination */
  offset: string;
  /** Limiting and Pagination */
  limit: string;
  /** admin */
  'body.admin': definitions['admin'];
  'rowFilter.admin.id': string;
  'rowFilter.admin.supabase_user_id': string;
  'rowFilter.admin.name': string;
  'rowFilter.admin.phone_number': string;
  'rowFilter.admin.otp': string;
  'rowFilter.admin.created_at': string;
  'rowFilter.admin.updated_at': string;
  'rowFilter.admin.cabang_id': string;
  /** appointment */
  'body.appointment': definitions['appointment'];
  'rowFilter.appointment.id': string;
  'rowFilter.appointment.date': string;
  'rowFilter.appointment.cancel': string;
  'rowFilter.appointment.done': string;
  'rowFilter.appointment.note': string;
  'rowFilter.appointment.created_at': string;
  'rowFilter.appointment.updated_at': string;
  'rowFilter.appointment.cabang_id': string;
  'rowFilter.appointment.klien_id': string;
  'rowFilter.appointment.stylish_id': string;
  'rowFilter.appointment.jam_id': string;
  /** cabang */
  'body.cabang': definitions['cabang'];
  'rowFilter.cabang.id': string;
  'rowFilter.cabang.name': string;
  'rowFilter.cabang.created_at': string;
  'rowFilter.cabang.updated_at': string;
  /** jam */
  'body.jam': definitions['jam'];
  'rowFilter.jam.id': string;
  'rowFilter.jam.jam_ke': string;
  'rowFilter.jam.pukul': string;
  'rowFilter.jam.created_at': string;
  'rowFilter.jam.updated_at': string;
  'rowFilter.jam.cabang_id': string;
  /** klien */
  'body.klien': definitions['klien'];
  'rowFilter.klien.id': string;
  'rowFilter.klien.name': string;
  'rowFilter.klien.jenis_kelamin': string;
  'rowFilter.klien.phone_number': string;
  'rowFilter.klien.phone_verified': string;
  'rowFilter.klien.otp': string;
  'rowFilter.klien.created_at': string;
  'rowFilter.klien.updated_at': string;
  /** rendered_service */
  'body.rendered_service': definitions['rendered_service'];
  'rowFilter.rendered_service.id': string;
  'rowFilter.rendered_service.service_id': string;
  'rowFilter.rendered_service.appointment_id': string;
  'rowFilter.rendered_service.created_at': string;
  'rowFilter.rendered_service.updated_at': string;
  /** service */
  'body.service': definitions['service'];
  'rowFilter.service.id': string;
  'rowFilter.service.name': string;
  'rowFilter.service.cost_estimate': string;
  'rowFilter.service.created_at': string;
  'rowFilter.service.updated_at': string;
  'rowFilter.service.service_category_id': string;
  /** service_category */
  'body.service_category': definitions['service_category'];
  'rowFilter.service_category.id': string;
  'rowFilter.service_category.name': string;
  'rowFilter.service_category.created_at': string;
  'rowFilter.service_category.updated_at': string;
  /** stylish */
  'body.stylish': definitions['stylish'];
  'rowFilter.stylish.id': string;
  'rowFilter.stylish.name': string;
  'rowFilter.stylish.phone_number': string;
  'rowFilter.stylish.senin_available': string;
  'rowFilter.stylish.selasa_available': string;
  'rowFilter.stylish.rabu_available': string;
  'rowFilter.stylish.kamis_available': string;
  'rowFilter.stylish.jumat_available': string;
  'rowFilter.stylish.sabtu_available': string;
  'rowFilter.stylish.minggu_available': string;
  'rowFilter.stylish.created_at': string;
  'rowFilter.stylish.updated_at': string;
  'rowFilter.stylish.cabang_id': string;
}

export interface operations {}

export interface external {}
